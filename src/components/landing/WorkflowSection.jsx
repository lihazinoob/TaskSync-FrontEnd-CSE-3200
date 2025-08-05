import { Container } from "@/components/ui/container";
import { BarChart2, GraduationCap, MapPin, UserCircle } from "lucide-react";
import React from "react";
import StepConnector from "./workflow/StepConnector";
import WorkflowStep from "./workflow/WorkflowStep";

const WorkflowSection = () => {
  const workflowSteps = [
    {
      number: "1",
      icon: <UserCircle className="w-6 h-6" />,
      title: "Create a profile",
      description:
        "Sign up and build your professional profile to unlock personalized career guidance and job recommendations.",
    },
    {
      number: "2",
      icon: <MapPin className="w-6 h-6" />,
      title: "Choose or generate a roadmap",
      description:
        "Select from curated career paths or generate a custom AI-powered roadmap based on your goals and experience.",
    },
    {
      number: "3",
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Apply for jobs and build skills",
      description:
        "Find relevant job opportunities and develop key skills aligned with your career roadmap.",
    },
    {
      number: "4",
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Track tasks & join communities",
      description:
        "Manage your career development with task tracking and connect with industry professionals in our communities.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <Container>
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Career Pilot simplifies your professional journey with a streamlined
            process
          </p>
        </div>

        {/* Mobile view - stacked vertically */}
        <div className="md:hidden space-y-4">
          {workflowSteps.map((step, index) => (
            <div key={index}>
              <WorkflowStep
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </div>
          ))}
        </div>

        {/* Desktop view - horizontal with connectors */}
        <div className="hidden md:flex gap-4 justify-between">
          {workflowSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 max-w-xs">
                <WorkflowStep
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </div>
              {index < workflowSteps.length - 1 && (
                <div className="flex items-center">
                  <StepConnector />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex justify-center">
          <a
            href="/signup"
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex h-10 md:h-11 items-center justify-center rounded-md px-6 md:px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            Get Started Now
          </a>
        </div>
      </Container>
    </section>
  );
};

export default WorkflowSection;
