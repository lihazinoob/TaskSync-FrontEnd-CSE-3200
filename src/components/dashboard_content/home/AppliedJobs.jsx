import { AlertCircle, CheckCircle, Clock, HourglassIcon } from "lucide-react";

const appliedJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp",
    logo: "https://logo.clearbit.com/techcorp.com",
    status: "interview",
    date: "Oct 15, 2023",
    nextStep: "Technical Interview on Nov 2",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "DataSystems Inc.",
    logo: "https://logo.clearbit.com/datasystems.io",
    status: "reviewing",
    date: "Oct 12, 2023",
  },
  {
    id: 3,
    title: "UI/UX Developer",
    company: "WebSolutions Ltd.",
    logo: "https://logo.clearbit.com/websolutions.co",
    status: "rejected",
    date: "Oct 5, 2023",
    feedback: "Looking for more experienced candidates",
  },
  {
    id: 4,
    title: "JavaScript Developer",
    company: "CodeMasters",
    logo: "https://logo.clearbit.com/codemasters.dev",
    status: "offered",
    date: "Sep 28, 2023",
    offer: "$110K, Remote",
  },
];

const statusIcons = {
  interview: <Clock className="text-amber-500" size={16} />,
  reviewing: <HourglassIcon className="text-blue-500" size={16} />,
  rejected: <AlertCircle className="text-red-500" size={16} />,
  offered: <CheckCircle className="text-green-500" size={16} />,
};

const statusLabels = {
  interview: "Interview Scheduled",
  reviewing: "Application Under Review",
  rejected: "Application Rejected",
  offered: "Offer Received",
};

const AppliedJobs = () => {
  return (
    <div className="rounded-xl bg-card p-5 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Applied Jobs</h3>

      <div className="flex flex-col gap-4 flex-1">
        {appliedJobs.map((job) => (
          <div
            key={job.id}
            className="p-3 bg-muted/40 rounded-lg border border-border/50"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                {job.logo ? (
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-semibold text-sm">
                    {job.company.substring(0, 2)}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <h4 className="font-medium">{job.title}</h4>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm mt-3">
              {statusIcons[job.status]}
              <span className="font-medium">{statusLabels[job.status]}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                Applied {job.date}
              </span>
            </div>

            {job.nextStep && (
              <p className="text-xs mt-2 text-muted-foreground bg-primary/5 p-2 rounded">
                Next: {job.nextStep}
              </p>
            )}
            {job.feedback && (
              <p className="text-xs mt-2 text-muted-foreground bg-red-500/5 p-2 rounded">
                Feedback: {job.feedback}
              </p>
            )}
            {job.offer && (
              <p className="text-xs mt-2 text-muted-foreground bg-green-500/5 p-2 rounded">
                Offer: {job.offer}
              </p>
            )}
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm text-primary font-medium hover:underline self-center">
        View all applications
      </button>
    </div>
  );
};

export default AppliedJobs;
