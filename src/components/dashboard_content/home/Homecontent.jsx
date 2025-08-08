import React, { useState } from 'react';
import AcceptedConnections from "./AcceptedConnections";
import CommunitySlide from "./CommunitySlide";
import ConnectionRequests from "./ConnectionRequests";
import MyPosts from "./MyPosts";
import Notifications from "./Notifications";
import RecentJobs from "./RecentJobs";
import SuggestedConnections from "./SuggestedConnections";

const Homecontent = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Callback function to refresh connections when a request is accepted
  const handleConnectionAccepted = (user) => {
    console.log('Connection accepted with:', user);
    // Trigger refresh of accepted connections
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
      <p>
        This is your home dashboard where you can view your analytics and
        summary.
      </p>

      {/* Community Slide section */}
      {/* <CommunitySlide /> */}

      {/* Three-card section */}
      <h3 className="text-xl font-semibold mb-1">Career Activity Overview</h3>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <SuggestedConnections />
        <RecentJobs />
        <ConnectionRequests onConnectionAccepted={handleConnectionAccepted} />
      </div>

      {/* Accepted Connections section */}
      <h3 className="text-xl font-semibold mb-1">My Professional Network</h3>
      <AcceptedConnections refreshTrigger={refreshTrigger} />

      {/* Notifications section */}
      <h3 className="text-xl font-semibold mt-6 mb-1">Activity Updates</h3>
      <Notifications />

      {/* My Posts section */}
      <h3 className="text-xl font-semibold mt-6 mb-1">My Professional Posts</h3>
      <MyPosts />
    </div>
  );
};

export default Homecontent;