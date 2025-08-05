import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BookOpen, MessageSquare } from "lucide-react";
import BlogCarousel from "./highlight/BlogCarousel";
import CommunitySection from "./highlight/CommunitySection";

const Highlight = () => {
  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="space-y-2 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Learn & Connect</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Grow your career with expert insights and community discussions
          </p>
          <Separator className="w-12 h-1 bg-primary mx-auto mt-6" />
        </div>

        <Tabs defaultValue="blog" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-72 grid-cols-2 h-11 bg-background border">
              <TabsTrigger
                value="blog"
                className={cn(
                  "flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "rounded-l-md"
                )}
              >
                <BookOpen className="h-4 w-4" />
                <span>Blog</span>
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className={cn(
                  "flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "rounded-r-md"
                )}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Community</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="blog" className="mt-0 focus-visible:outline-none">
            <div className="mb-8 flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  Latest Articles
                </h3>
                <p className="text-sm text-muted-foreground">
                  Expert insights to advance your career
                </p>
              </div>
              <a
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                View all articles
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
            <BlogCarousel />
          </TabsContent>

          <TabsContent
            value="community"
            className="mt-0 focus-visible:outline-none"
          >
            <div className="mb-8 flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  Popular Discussions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Join conversations that matter
                </p>
              </div>
              <a
                href="/community"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                Join the community
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
            <CommunitySection />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
};

export default Highlight;
