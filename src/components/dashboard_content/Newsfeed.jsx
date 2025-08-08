import React, { useState } from 'react';
import { Newspaper } from "lucide-react";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";
import CreatePostForm from "./newsfeed/CreatePostForm";
import PostsFeed from "./newsfeed/PostsFeed";

const Newsfeed = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle new post creation
  const handlePostCreated = (newPost) => {
    console.log('New post created:', newPost);
    // Trigger posts refresh
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <DashboardHeader title="Newsfeed" breadcrumb="Latest News" />
      <div className="flex flex-col gap-6 p-4 pt-0">
        <TabTitle title="Newsfeed" icon={<Newspaper />} />
        
        {/* Create Post Section */}
        <CreatePostForm onPostCreated={handlePostCreated} />
        
        {/* Posts Feed Section */}
        <PostsFeed refreshTrigger={refreshTrigger} />
      </div>
    </>
  );
};

export default Newsfeed;