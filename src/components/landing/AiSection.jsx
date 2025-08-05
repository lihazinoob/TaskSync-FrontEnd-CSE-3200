import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import AiPromptInput from "./ai/AiPromptInput";
import GeneratingAnimation from "./ai/GeneratingAnimation";
import RoadmapPreview from "./ai/RoadmapPreview";

const AiSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowRoadmap(false);

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowRoadmap(true);
    }, 3000);
  };

  const handleTryAgain = () => {
    setShowRoadmap(false);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-3 bg-primary/10 py-1 px-3 rounded-full">
              <Sparkles className="text-primary w-4 h-4 mr-2" />
              <span className="text-sm font-medium">
                AI-Powered Career Planning
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Your Career Roadmap{" "}
              <span className="text-primary">in Seconds</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our AI analyzes industry trends, job requirements, and your skills
              to create a personalized roadmap for your career success.
            </p>

            {!showRoadmap && !isGenerating && (
              <div className="flex justify-center mb-8">
                <AiPromptInput onGenerate={handleGenerate} />
              </div>
            )}
          </div>

          <div className="bg-card border rounded-xl shadow-lg overflow-hidden">
            <div className="md:grid md:grid-cols-12">
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  Personalized Career Guidance
                </h3>
                <p className="text-muted-foreground mb-6">
                  Simply enter your desired career path, and our AI will
                  generate a step-by-step roadmap tailored to your goals.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Clear skill progression paths</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Industry-relevant technologies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Customized learning resources</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Regular updates based on industry trends</span>
                  </li>
                </ul>

                {showRoadmap ? (
                  <div className="mt-auto">
                    <p className="text-sm text-muted-foreground mb-3">
                      Try another career path:
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleTryAgain}
                      className="mr-3"
                    >
                      Try Another Roadmap
                    </Button>
                    <Button>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Sign Up For Full Access
                    </Button>
                  </div>
                ) : (
                  <div className="mt-auto md:hidden">
                    <Button className="w-full" onClick={() => handleGenerate()}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Try the AI Now
                    </Button>
                  </div>
                )}
              </div>

              <div className="md:col-span-5 bg-muted/30 border-t md:border-t-0 md:border-l">
                <div className="h-full min-h-[380px] flex items-center justify-center p-4">
                  {isGenerating ? (
                    <GeneratingAnimation />
                  ) : showRoadmap ? (
                    <div className="w-full h-full">
                      <RoadmapPreview />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-6">
                        <Sparkles className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          Ready to discover your career path?
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Enter your desired role above to get started.
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <Button onClick={() => handleGenerate()}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Try the AI Now
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AiSection;
