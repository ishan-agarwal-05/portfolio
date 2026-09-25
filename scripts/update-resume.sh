#!/usr/bin/env bash
# Rebuild the resume from its LaTeX source and publish the web copy.
#
#   ./scripts/update-resume.sh                # newest Ishan_Agarwal_Resume_*.tex
#   ./scripts/update-resume.sh path/to/x.tex  # a specific source file
#   ./scripts/update-resume.sh --no-deploy    # build and copy, skip commit + deploy
#
# Produces two PDFs next to the .tex: the full one (with phone number) for
# applications, and a _web one without the phone number, which is what the
# site serves at /Ishan_Agarwal_Resume.pdf.
set -euo pipefail

RESUMES_DIR="/Users/ishan/personal/resumes"
SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY=1
TEX=""

for arg in "$@"; do
  case "$arg" in
    --no-deploy) DEPLOY=0 ;;
    *) TEX="$arg" ;;
  esac
done

if [[ -z "$TEX" ]]; then
  TEX="$(ls -t "$RESUMES_DIR"/Ishan_Agarwal_Resume_*.tex | grep -v '_web\.tex$' | head -1)"
fi
[[ -f "$TEX" ]] || { echo "No resume source found: $TEX" >&2; exit 1; }

BASE="${TEX%.tex}"
WEB_TEX="${BASE}_web.tex"
echo "Source: $TEX"

# The web copy is always regenerated from the main file, so the two can't drift.
# It drops the "+65 ... |" phone segment from the contact line.
sed -E 's/\+65 [0-9 ]+ \\textbar\{\} //' "$TEX" > "$WEB_TEX"
if grep -qE '\+65 [0-9]' "$WEB_TEX"; then
  echo "Phone number still present in the web copy; not publishing." >&2
  exit 1
fi

OUT_DIR="$(dirname "$TEX")"
# Stamp the PDFs with the source's modification time instead of "now", so an
# unchanged source rebuilds to a byte-identical file and isn't republished.
export SOURCE_DATE_EPOCH="$(stat -f %m "$TEX")"
tectonic -X compile "$TEX" --outdir "$OUT_DIR" >/dev/null
tectonic -X compile "$WEB_TEX" --outdir "$OUT_DIR" >/dev/null
echo "Built: ${BASE}.pdf (for applications)"
echo "Built: ${BASE}_web.pdf (for the site)"

# Role-specific versions (Backend, Robotics, AI) live in resumes/variants/.
# They're built for applications only and never published to the site.
VARIANTS="$RESUMES_DIR/variants/build-variants.sh"
if [[ -x "$VARIANTS" ]]; then
  "$VARIANTS" "$TEX" || echo "Role-specific versions failed to build; the main resume is unaffected." >&2
fi

cp "${BASE}_web.pdf" "$SITE_DIR/public/Ishan_Agarwal_Resume.pdf"
cd "$SITE_DIR"

if git diff --quiet -- public/Ishan_Agarwal_Resume.pdf; then
  echo "The site already has this version. Nothing to publish."
  exit 0
fi

if [[ "$DEPLOY" -eq 0 ]]; then
  echo "Copied into public/. Skipping commit and deploy (--no-deploy)."
  exit 0
fi

git add public/Ishan_Agarwal_Resume.pdf
git commit -q -m "Update resume"
git push -q
vercel deploy --prod --yes >/dev/null
echo "Live at https://ishan-agarwal.com/Ishan_Agarwal_Resume.pdf"
