import { Container } from "@/components/ui/container";
import {
  BarChart3,
  BookOpen,
  Brain,
  Building,
  CheckSquare,
  Map,
  Search,
  Users,
} from "lucide-react";
import FeatureCard from "./feature/FeatureCard";

const FeatureSection = () => {
  const features = [
    {
      icon: <Search />,
      title: "Job Search & Apply",
      description:
        "Find and apply to jobs matching your skills and preferences in one place.",
    },
    {
      icon: <Map />,
      title: "AI-Powered Roadmaps",
      description:
        "Personalized career paths and guidance based on your goals and experience.",
    },
    {
      icon: <Users />,
      title: "Community & Forums",
      description:
        "Connect with peers, mentors, and industry experts for advice and networking.",
    },
    {
      icon: <BarChart3 />,
      title: "Skill Tracking",
      description:
        "Monitor your progress and identify key skills to develop for career growth.",
    },
    {
      icon: <Building />,
      title: "Company Profiles",
      description:
        "Detailed insights into potential employers, culture, and opportunities.",
    },
    {
      icon: <CheckSquare />,
      title: "Task & Career Management",
      description:
        "Organize your job search and career development with powerful tools.",
    },
    {
      icon: <BookOpen />,
      title: "Blog & Career Tips",
      description:
        "Expert advice and resources to help you succeed in your professional journey.",
    },
    {
      icon: <Brain />,
      title: "Expert Advice",
      description:
        "Get personalized career advice and resources to help you succeed in your professional journey.",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">What We Offer</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to navigate your career journey efficiently and
            successfully
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeatureSection;
