import type { Metadata } from "next";
import AskAgent from "@/components/AskAgent";

export const metadata: Metadata = {
  title: "Ask the agent",
  description:
    "An AI agent that answers questions about Ishan's experience, projects and background, grounded in the same data that renders this site.",
};

export default function AskPage() {
  return <AskAgent />;
}
