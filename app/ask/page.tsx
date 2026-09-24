import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AskAgent from "@/components/AskAgent";
import { agentEnabled } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ask the agent",
  description:
    "An AI agent that answers questions about Ishan's experience, projects and background, grounded in the same data that renders this site.",
};

export default function AskPage() {
  if (!agentEnabled) notFound();
  return <AskAgent />;
}
