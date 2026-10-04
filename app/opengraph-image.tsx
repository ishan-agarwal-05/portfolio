import { ogSize, siteCard } from "@/lib/og";

export const alt = "Ishan Agarwal, Software Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return siteCard();
}
