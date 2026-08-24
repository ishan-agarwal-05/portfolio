import Hero from "@/components/Hero";
import NowSection from "@/components/NowSection";
import WorkSection from "@/components/WorkSection";
import ProjectsSection from "@/components/ProjectsSection";
import HonoursSection from "@/components/HonoursSection";
import SkillsSection from "@/components/SkillsSection";
import BeyondSection from "@/components/BeyondSection";

export default function Home() {
  return (
    <>
      <Hero />
      <NowSection />
      <WorkSection />
      <ProjectsSection />
      <HonoursSection />
      <SkillsSection />
      <BeyondSection />
    </>
  );
}
