import NotificationCard from "./NotificationCard";
import NotificationEmpty from "./NotificationEmpty";

const NotificationList = ({
  notifications = [],
  activeTab = "all",
  activeType = "all",
  onNotificationClick = () => {},
  loading = false,
}) => {
  // Filter notifications based on activeTab and activeType
  const filteredNotifications = notifications.filter((notification) => {
    // First filter by read/unread status
    if (activeTab === "read" && !notification.read) return false;
    if (activeTab === "unread" && notification.read) return false;

    // Then filter by notification type
    if (activeType !== "all" && notification.sourceType !== activeType)
      return false;

    return true;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 p-4 border-b animate-pulse">
            <div className="h-10 w-10 bg-secondary rounded-full"></div>
            <div className="flex-1">
              <div className="h-5 w-1/3 bg-secondary rounded mb-2"></div>
              <div className="h-4 w-full bg-secondary/60 rounded mb-1"></div>
              <div className="h-4 w-2/3 bg-secondary/60 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredNotifications.length === 0) {
    const getMessage = () => {
      if (activeTab === "read") return "You have no read notifications";
      if (activeTab === "unread") return "You have no unread notifications";
      if (activeType !== "all") return `No ${activeType} notifications found`;
      return "You don't have any notifications yet";
    };

    return <NotificationEmpty message={getMessage()} />;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      {filteredNotifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          title={notification.title}
          message={notification.message}
          time={notification.time}
          type={notification.type}
          read={notification.read}
          avatar={notification.avatar}
          invitationData={notification.invitationData}
          onClick={() => onNotificationClick(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationList;
