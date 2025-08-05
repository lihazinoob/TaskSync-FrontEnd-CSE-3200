import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import DiscussionCard from "./DiscussionCard";

const CommunitySection = () => {
  const categories = [
    { value: "trending", label: "Trending" },
    { value: "career", label: "Career Advice" },
    { value: "interviews", label: "Interviews" },
    { value: "skills", label: "Skills" },
  ];

  const trendingDiscussions = [
    {
      id: 1,
      title: "Is a computer science degree still worth it in 2024?",
      category: "Career Advice",
      replies: 48,
      likes: 136,
      participants: 23,
      lastActivity: "2h ago",
    },
    {
      id: 2,
      title: "Best resources for learning system design interviews?",
      category: "Interviews",
      replies: 32,
      likes: 98,
      participants: 17,
      lastActivity: "5h ago",
    },
    {
      id: 3,
      title: "Transitioning from frontend to full stack - advice needed",
      category: "Career Advice",
      replies: 29,
      likes: 87,
      participants: 15,
      lastActivity: "8h ago",
    },
    {
      id: 4,
      title: "Most in-demand programming languages for 2024",
      category: "Skills",
      replies: 53,
      likes: 142,
      participants: 31,
      lastActivity: "12h ago",
    },
    {
      id: 5,
      title: "Negotiating remote work with a new job offer",
      category: "Career Advice",
      replies: 41,
      likes: 119,
      participants: 22,
      lastActivity: "18h ago",
    },
    {
      id: 6,
      title: "Anyone using AI to prepare for technical interviews?",
      category: "Interviews",
      replies: 37,
      likes: 95,
      participants: 19,
      lastActivity: "23h ago",
    },
  ];

  // Filter discussions by category
  const getDiscussionsByCategory = (category) => {
    if (category === "trending") return trendingDiscussions;
    return trendingDiscussions.filter((d) => d.category === category);
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="trending">
        <TabsList className="w-full flex mb-6 overflow-auto hide-scrollbar border-b pb-px space-x-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className={cn(
                "rounded-none border-b-2 border-transparent px-4",
                "data-[state=active]:border-primary data-[state=active]:bg-transparent"
              )}
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category.value}
            value={category.value}
            className="mt-0 focus-visible:outline-none"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getDiscussionsByCategory(category.value).map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  title={discussion.title}
                  category={discussion.category}
                  replies={discussion.replies}
                  likes={discussion.likes}
                  participants={discussion.participants}
                  lastActivity={discussion.lastActivity}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CommunitySection;
