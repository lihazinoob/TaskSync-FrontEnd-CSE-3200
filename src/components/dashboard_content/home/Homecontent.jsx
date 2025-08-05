import AppliedJobs from "./AppliedJobs";
import CommunitySlide from "./CommunitySlide";
import MyPosts from "./MyPosts";
import Notifications from "./Notifications";
import RecentJobs from "./RecentJobs";
import SuggestedConnections from "./SuggestedConnections";

const Homecontent = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
      <p>
        This is your home dashboard where you can view your analytics and
        summary.
      </p>

      {/* Community Slide section */}
      <CommunitySlide />

      {/* Three-card section */}
      <h3 className="text-xl font-semibold mb-1">Career Activity Overview</h3>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <SuggestedConnections />
        <RecentJobs />
        <AppliedJobs />
      </div>

      {/* Notifications section */}
      <h3 className="text-xl font-semibold mt-2 mb-1">Activity Updates</h3>
      <Notifications />

      {/* My Posts section */}
      <h3 className="text-xl font-semibold mt-2 mb-1">My Professional Posts</h3>
      <MyPosts />

      {/* Stats section */}
      {/* <h3 className="text-xl font-semibold mt-2">Your Application Stats</h3>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-4">
          <div className="text-center">
            <h3 className="font-semibold">Total Applications</h3>
            <p className="text-2xl font-bold mt-2">24</p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-4">
          <div className="text-center">
            <h3 className="font-semibold">Interviews</h3>
            <p className="text-2xl font-bold mt-2">8</p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center p-4">
          <div className="text-center">
            <h3 className="font-semibold">Offers</h3>
            <p className="text-2xl font-bold mt-2">3</p>
          </div>
        </div>
      </div> */}

      {/* Recent Activity */}
      {/* <div className="min-h-[40vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min mt-2">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="p-3 bg-background rounded-lg">
            Applied for Frontend Developer at TechCorp
          </div>
          <div className="p-3 bg-background rounded-lg">
            Interview scheduled with DataSystems Inc.
          </div>
          <div className="p-3 bg-background rounded-lg">
            Received offer from WebSolutions Ltd.
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Homecontent;
