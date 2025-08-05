import { UserPlus } from "lucide-react";

const connections = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Frontend Developer",
    company: "TechCorp",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "UX Designer",
    company: "Design Studios",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Chen",
    position: "Full Stack Developer",
    company: "WebSolutions",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    position: "Product Manager",
    company: "InnovateTech",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

const SuggestedConnections = () => {
  return (
    <div className="rounded-xl bg-card p-5 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Suggested Connections</h3>

      <div className="flex flex-col gap-4 flex-1">
        {connections.map((connection) => (
          <div key={connection.id} className="flex items-center gap-3">
            <img
              src={connection.avatar}
              alt={connection.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{connection.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                {connection.position} at {connection.company}
              </p>
            </div>
            <button className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
              <UserPlus size={16} />
            </button>
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm text-primary font-medium hover:underline self-center">
        View all connections
      </button>
    </div>
  );
};

export default SuggestedConnections;
