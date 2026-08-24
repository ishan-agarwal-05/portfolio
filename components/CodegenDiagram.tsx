// Architecture diagram for the HMGICS action-graph code generator.
// Drawn from the published internship report; internal details approximated.
export default function CodegenDiagram() {
  const box = "fill-surface stroke-line";
  const label = "fill-ink font-mono";
  const sub = "fill-faint font-mono";
  return (
    <figure className="mt-14 border border-line bg-surface p-4 sm:p-6">
      <svg viewBox="0 0 760 300" className="w-full" role="img" aria-label="Pipeline: Kawasaki AS program to validated Isaac Sim compound node">
        {/* row 1: pipeline */}
        <g strokeWidth="1.2">
          <rect x="8" y="40" width="150" height="64" className={box} />
          <text x="83" y="66" textAnchor="middle" fontSize="12" className={label}>Kawasaki AS</text>
          <text x="83" y="82" textAnchor="middle" fontSize="12" className={label}>robot program</text>
          <text x="83" y="97" textAnchor="middle" fontSize="9" className={sub}>joint values · signals</text>

          <rect x="220" y="40" width="150" height="64" className={box} />
          <text x="295" y="66" textAnchor="middle" fontSize="12" className={label}>generator script</text>
          <text x="295" y="82" textAnchor="middle" fontSize="12" className={label}>(deterministic Python)</text>
          <text x="295" y="97" textAnchor="middle" fontSize="9" className={sub}>AS → graph translation rules</text>

          <rect x="432" y="40" width="150" height="64" className={box} />
          <text x="507" y="66" textAnchor="middle" fontSize="12" className={label}>wired compound</text>
          <text x="507" y="82" textAnchor="middle" fontSize="12" className={label}>node in Isaac Sim</text>
          <text x="507" y="97" textAnchor="middle" fontSize="9" className={sub}>nodes · wiring · fork/join</text>

          <rect x="602" y="40" width="150" height="64" className="fill-copper/10 stroke-copper" />
          <text x="677" y="66" textAnchor="middle" fontSize="12" className={label}>USD diff vs</text>
          <text x="677" y="82" textAnchor="middle" fontSize="12" className={label}>manual baseline</text>
          <text x="677" y="97" textAnchor="middle" fontSize="9" className={sub}>the validation oracle</text>
        </g>
        {/* arrows */}
        <g className="stroke-faint" strokeWidth="1.2">
          <line x1="158" y1="72" x2="212" y2="72" markerEnd="url(#arr)" />
          <line x1="370" y1="72" x2="424" y2="72" markerEnd="url(#arr)" />
          <line x1="582" y1="72" x2="594" y2="72" markerEnd="url(#arr)" />
        </g>
        {/* row 2: shared module */}
        <g strokeWidth="1.2">
          <rect x="220" y="180" width="362" height="58" className={box} strokeDasharray="4 3" />
          <text x="401" y="204" textAnchor="middle" fontSize="12" className={label}>codegen_utils.py — shared helper module</text>
          <text x="401" y="222" textAnchor="middle" fontSize="9" className={sub}>node creation · wiring · attributes · target-prim relationships · 4 undocumented API workarounds</text>
        </g>
        <g className="stroke-faint" strokeWidth="1.2" strokeDasharray="3 3">
          <line x1="295" y1="176" x2="295" y2="108" markerEnd="url(#arr)" />
          <line x1="507" y1="176" x2="507" y2="108" markerEnd="url(#arr)" />
        </g>
        {/* feedback arrow */}
        <path d="M 677 108 V 150 H 620" fill="none" className="stroke-copper" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrc)" />
        <text x="600" y="166" textAnchor="end" fontSize="9" className="fill-copper font-mono">mismatch → new workaround</text>
        <defs>
          <marker id="arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" className="fill-faint" />
          </marker>
          <marker id="arrc" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 z" className="fill-copper" />
          </marker>
        </defs>
      </svg>
      <figcaption className="microlabel mt-3">
        fig. — the generation loop. One engineer-week of manual wiring per subprogram, reduced to seconds per run. (Reconstructed from my published internship report; internal specifics simplified.)
      </figcaption>
    </figure>
  );
}
