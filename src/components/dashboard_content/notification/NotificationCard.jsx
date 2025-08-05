import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { acceptInvitationToJoinCompany } from "@/service/api/company";
import { BellRing, Check, Clock } from "lucide-react";
import { toast } from "sonner";

const NotificationCard = ({
  title,
  message,
  time,
  type = "default",
  read = false,
  avatar,
  onClick,
  invitationData,
}) => {
  const typeStyles = {
    default: "bg-secondary",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-destructive",
    info: "bg-blue-500",
  };

  const typeIcons = {
    default: <BellRing className="h-5 w-5" />,
    success: <Check className="h-5 w-5" />,
    warning: <BellRing className="h-5 w-5" />,
    error: <BellRing className="h-5 w-5" />,
    info: <BellRing className="h-5 w-5" />,
  };

  // function for accepting the invitation
  const handleAccept = async() => {
    console.log("Accept button is clicked");
    // Add your accept logic here
    if(!invitationData?.id) {
      console.error("No invitation data available to accept.");
      return;
    }
    const response = await acceptInvitationToJoinCompany(invitationData.id);
    if (response.success) {
      toast.success("Invitation accepted", {
        description: `You have joined ${invitationData.companyName}.`,
      });
    } else {
      toast.error("Failed to accept invitation", {
        description: response.message,
      });
    }
  };

  return (
    <div
      className={cn(
        "flex gap-4 p-4 border-b hover:bg-secondary/20 transition-colors cursor-pointer",
        !read && "bg-secondary/10"
      )}
      onClick={onClick}
    >
      <div className="mt-1">
        {avatar ? (
          <Avatar>
            <img src={avatar} alt="Avatar" />
          </Avatar>
        ) : (
          <div className={cn("p-2 rounded-full text-white", typeStyles[type])}>
            {typeIcons[type]}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {time}
            </span>
            {!read && <Badge className="h-2 w-2 rounded-full p-0 bg-primary" />}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{message}</p>

        {invitationData?.status === "PENDING" && (
          <div className="mt-2 flex gap-2">
            <Button size="sm" onClick={handleAccept}>
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={()=>{console.log("Reject button is clicked")}}>
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
