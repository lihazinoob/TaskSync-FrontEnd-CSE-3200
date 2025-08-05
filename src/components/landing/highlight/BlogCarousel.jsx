import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import BlogCard from "./BlogCard";

const BlogCarousel = () => {
  const blogPosts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      title: "10 Essential Skills Every Frontend Developer Needs in 2024",
      excerpt:
        "Stay ahead of the curve with these must-have skills for frontend developers. From React to design systems, we cover the essential skills to boost your career.",
      category: "Career Development",
      date: "May 15, 2024",
      authorName: "Alex Johnson",
      authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      title:
        "How to Ace Your Next Technical Interview: Tips from Hiring Managers",
      excerpt:
        "Nervous about your upcoming tech interview? Learn insider strategies from hiring managers at top tech companies to boost your confidence and land the job.",
      category: "Interviews",
      date: "May 8, 2024",
      authorName: "Sarah Chen",
      authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      title: "Breaking into AI: Career Paths for Software Engineers",
      excerpt:
        "Interested in transitioning to AI? This comprehensive guide outlines various career paths for software engineers looking to enter the exciting field of artificial intelligence.",
      category: "AI",
      date: "May 3, 2024",
      authorName: "Michael Torres",
      authorImage: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      title: "The Future of Remote Work in Tech: Trends and Predictions",
      excerpt:
        "Remote work has transformed the tech industry. Discover the latest trends and future predictions that will shape how we work in the coming years.",
      category: "Workplace",
      date: "April 29, 2024",
      authorName: "Olivia Wilson",
      authorImage: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      title: "Building a Personal Brand as a Developer: A Step-by-Step Guide",
      excerpt:
        "Learn how to create a strong personal brand that helps you stand out in a competitive job market and opens doors to new opportunities.",
      category: "Personal Growth",
      date: "April 22, 2024",
      authorName: "James Roberts",
      authorImage: "https://randomuser.me/api/portraits/men/92.jpg",
    },
  ];

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {blogPosts.map((post) => (
            <CarouselItem
              key={post.id}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full group">
                <BlogCard
                  image={post.image}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  date={post.date}
                  authorName={post.authorName}
                  authorImage={post.authorImage}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-6">
          <CarouselPrevious
            className={cn(
              "static h-8 w-8",
              "hover:bg-primary hover:text-primary-foreground",
              "border border-border rounded-full"
            )}
          />
          <CarouselNext
            className={cn(
              "static h-8 w-8",
              "hover:bg-primary hover:text-primary-foreground",
              "border border-border rounded-full"
            )}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default BlogCarousel;
