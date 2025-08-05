import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const BlogCard = ({
  image,
  title,
  excerpt,
  category,
  date,
  authorName,
  authorImage,
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col border-none shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <Badge variant="secondary" className="absolute top-3 left-3 z-10">
          {category}
        </Badge>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-4 border-t">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>{date}</span>
        </div>
        <div className="flex items-center mt-3">
          <img
            src={authorImage}
            alt={authorName}
            className="w-6 h-6 rounded-full mr-2 object-cover ring-1 ring-border"
          />
          <span className="text-xs font-medium">{authorName}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
