import {
  Bell,
  CalendarClock,
  CheckCircle2,
  MessageSquare,
  UserCheck,
  UserPlus,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "message",
    content: "Jane Smith sent you a message about your job application",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "connection",
    content: "Robert Johnson accepted your connection request",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "interview",
    content:
      "Interview scheduled with DataSystems Inc. for Frontend Engineer position",
    time: "Yesterday at 4:30 PM",
    read: true,
  },
  {
    id: 4,
    type: "application",
    content: "Your application for UX/UI Designer at Design Studios was viewed",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "connection",
    content: "Anna Lee wants to connect with you",
    time: "3 days ago",
    read: true,
  },
];

const notificationIcons = {
  message: <MessageSquare size={18} className="text-blue-500" />,
  connection: <UserCheck size={18} className="text-green-500" />,
  invitation: <UserPlus size={18} className="text-purple-500" />,
  interview: <CalendarClock size={18} className="text-amber-500" />,
  application: <CheckCircle2 size={18} className="text-sky-500" />,
};

const Notifications = () => {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={18} />
          <h3 className="text-lg font-semibold">Recent Notifications</h3>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="divide-y divide-border/60">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`py-3 flex gap-3 items-start ${
              notification.read ? "opacity-70" : "bg-muted/30"
            }`}
          >
            <div className="p-2 bg-muted rounded-full">
              {notificationIcons[notification.type]}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm ${!notification.read ? "font-medium" : ""}`}
              >
                {notification.content}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {notification.time}
              </p>
            </div>

            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-primary font-medium hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;
