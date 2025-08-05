import { Button } from "@/components/ui/button";
import { BellOff } from "lucide-react";

const NotificationEmpty = ({
  message = "No notifications to display",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-secondary/30 p-6 rounded-full mb-4">
        <BellOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">It's quiet here</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{message}</p>

      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default NotificationEmpty;
