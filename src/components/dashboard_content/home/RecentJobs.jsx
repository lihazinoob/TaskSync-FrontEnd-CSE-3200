import { Bookmark, Building2, MapPin } from "lucide-react";

const recentJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90K - $120K",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Design Studios",
    location: "Remote",
    type: "Contract",
    salary: "$70K - $90K",
    postedDate: "3 days ago",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "WebSolutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100K - $130K",
    postedDate: "5 days ago",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$110K - $140K",
    postedDate: "1 week ago",
  },
];

const RecentJobs = () => {
  return (
    <div className="rounded-xl bg-card p-5 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Recent Jobs</h3>

      <div className="flex flex-col gap-4 flex-1">
        {recentJobs.map((job) => (
          <div
            key={job.id}
            className="p-3 bg-muted/40 rounded-lg border border-border/50"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{job.title}</h4>
              <button className="text-muted-foreground hover:text-primary">
                <Bookmark size={16} />
              </button>
            </div>

            <div className="flex flex-col gap-1 mb-2">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Building2 size={14} />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {job.type}
              </span>
              <span className="text-xs text-muted-foreground">
                {job.postedDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm text-primary font-medium hover:underline self-center">
        Browse all jobs
      </button>
    </div>
  );
};

export default RecentJobs;
