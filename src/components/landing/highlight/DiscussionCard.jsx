import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MessageSquare, ThumbsUp, Users } from "lucide-react";

const DiscussionCard = ({
  title,
  category,
  replies,
  likes,
  participants,
  lastActivity,
}) => {
  return (
    <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-5 flex flex-col h-full">
        <Badge
          variant="outline"
          className="w-fit mb-3 border-primary/20 text-primary bg-primary/5 hover:bg-primary/10"
        >
          {category}
        </Badge>

        <h3 className="font-medium text-base mb-4 line-clamp-2 hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" />
              <span>{replies}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="h-3 w-3" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3" />
              <span>{participants}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            <span>{lastActivity}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionCard;
