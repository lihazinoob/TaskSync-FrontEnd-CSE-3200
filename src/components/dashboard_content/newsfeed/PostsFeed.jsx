import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2, MessageSquare } from 'lucide-react';
import { fetchAllPostsWithUserInfo } from '@/service/api/posts'; // ✅ Import the new function
import { toast } from 'sonner';
import PostCard from './PostCard';

const PostsFeed = ({ refreshTrigger }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts from API with user information
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching posts with user info from API...');
      const response = await fetchAllPostsWithUserInfo(); // ✅ Use the new function
      
      if (response.success) {
        setPosts(response.data);
        console.log('Posts with user info fetched successfully:', response.data);
      } else {
        setError(response.message || 'Failed to fetch posts');
        console.error('Failed to fetch posts:', response.message);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Error fetching posts');
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount and when refreshTrigger changes
  useEffect(() => {
    loadPosts();
  }, [refreshTrigger]);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border rounded-xl p-4 animate-pulse">
            <div className="flex gap-4 mb-4">
              <div className="h-10 w-10 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 w-1/3 bg-muted rounded mb-2"></div>
                <div className="h-3 w-1/4 bg-muted rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-3/4 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-card border rounded-xl p-8 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Failed to load posts</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={loadPosts} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="bg-card border rounded-xl p-8 text-center">
        <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground mb-4">
          Be the first to share something with the community!
        </p>
        <Button onClick={loadPosts} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-2/3 mx-auto">
      {/* Refresh button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Posts</h3>
        <Button 
          onClick={loadPosts} 
          variant="outline" 
          size="sm"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      {/* Posts list */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load more button (if pagination is needed) */}
      {posts.length > 0 && (
        <div className="text-center pt-4">
          <Button variant="outline" className="w-full sm:w-auto">
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostsFeed;