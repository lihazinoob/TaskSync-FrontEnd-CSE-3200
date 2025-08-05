import { Bell, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";
import NotificationFilter from "./notification/NotificationFilter";
import NotificationList from "./notification/NotificationList";
import { mockNotifications } from "./notification/mockData";
import { getRecievedInvitationToJoinACompany } from "@/service/api/company";
import { format } from "date-fns";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [loading, setLoading] = useState(false);

  // fetch the invitation notification on mount
  useEffect(() => {
    const fetchNotificationsForCompanyJoinInvitation = async () => {
      setLoading(true);
      try {
        const response = await getRecievedInvitationToJoinACompany();
        if (response.success) {
          // Transform the response data to match the notification structure
          const invitationNotifications = response.data.map((invitation) => ({
            id: `invitation-${invitation.id}`,
            title: `Invitation to join ${invitation.companyName}`,
            message: `You have been invited by ${
              invitation.inviterUsername
            } to join ${
              invitation.companyName
            } as an ${invitation.role.toLowerCase()}.`,
            time: format(new Date(invitation.createdAt), "MMM d, yyyy HH:mm"),
            type:
              invitation.status === "PENDING"
                ? "info"
                : invitation.status === "ACCEPTED"
                ? "success"
                : "error",
            read: invitation.status !== "PENDING",
            sourceType: "invitation",
            invitationData: invitation, // Store invitation data for actions
          }));

          setNotifications(invitationNotifications);
        }
        else {
          toast.error(response.message || "Failed to fetch notifications.");
          console.error("Failed to fetch notifications:", response.message);
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to fetch notifications.");
        setNotifications([]);
      }
      finally{
        setLoading(false);
      }
    };
    fetchNotificationsForCompanyJoinInvitation();
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id) => {
    // Mark notification as read when clicked
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    // Show toast confirming the notification was marked as read
    toast("Notification marked as read", {
      description: "This notification has been marked as read",
    });
  };

  const handleMarkAllAsRead = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
      setLoading(false);

      toast("Success", {
        description: "All notifications marked as read",
      });
    }, 1000);
  };

  return (
    <>
      <DashboardHeader title="Notification" breadcrumb="Notifications" />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between mb-4">
          <TabTitle title="Notifications" icon={<Bell />}>
            {unreadCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                {unreadCount} new
              </span>
            )}
          </TabTitle>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <CheckCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Mark all as read</span>
            </Button>
          )}
        </div>

        <NotificationFilter
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeType={activeType}
          setActiveType={setActiveType}
        />

        <NotificationList
          notifications={notifications}
          activeTab={activeTab}
          activeType={activeType}
          onNotificationClick={handleNotificationClick}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Notification;
