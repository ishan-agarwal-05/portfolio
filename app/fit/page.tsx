import type { Metadata } from "next";
import FitChecker from "@/components/FitChecker";

export const metadata: Metadata = {
  title: "Match a job description",
  description: "Paste a JD and see how Ishan's experience lines up, including the gaps.",
};

export default function FitPage() {
  return <FitChecker />;
}
