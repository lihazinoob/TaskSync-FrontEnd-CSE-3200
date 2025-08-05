import AiSection from "@/components/landing/AiSection";
import Company from "@/components/landing/Company";
import FeatureSection from "@/components/landing/FeatureSection";
import HeroSection from "@/components/landing/HeroSection";
import Highlight from "@/components/landing/Highlight";
import WorkflowSection from "@/components/landing/WorkflowSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Ensure the page starts at the top when loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <FeatureSection />
      <WorkflowSection />
      <AiSection />
      <Highlight />
      <Company />
    </>
  );
};

export default Home;
