import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, RefreshCw, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchPostCommentsWithUserInfo } from '@/service/api/comments';
import { toast } from 'sonner';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

const CommentsSection = ({ postId, initialCommentsCount = 0 }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(initialCommentsCount);

  // Load comments
  const loadComments = async () => {
    if (!showComments) return;
    
    setLoading(true);
    try {
      console.log('Loading comments for post:', postId);
      const response = await fetchPostCommentsWithUserInfo(postId);
      
      if (response.success) {
        setComments(response.data);
        // Count total comments including replies
        const totalComments = countTotalComments(response.data);
        setCommentsCount(totalComments);
        console.log('Comments loaded successfully:', response.data);
      } else {
        toast.error(response.message || 'Failed to load comments');
      }
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to count total comments including nested replies
  const countTotalComments = (comments) => {
    let count = 0;
    
    const countRecursive = (commentsList) => {
      commentsList.forEach(comment => {
        count++;
        if (comment.replies && comment.replies.length > 0) {
          countRecursive(comment.replies);
        }
      });
    };
    
    countRecursive(comments);
    return count;
  };

  // Load comments when section is opened
  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments, postId]);

  // Handle new comment added (direct comment to post)
  const handleCommentAdded = (newComment) => {
    console.log('New comment added:', newComment);
    
    // For direct comments (parentId is null), add to the beginning of comments array
    if (!newComment.parentId) {
      setComments(prev => [newComment, ...prev]);
      setCommentsCount(prev => prev + 1);
    } else {
      // For replies, we'll refresh the comments to get the updated structure
      loadComments();
    }
  };

  // Handle reply added (this will be handled by individual comment items)
  const handleReplyAdded = (newReply) => {
    console.log('New reply added:', newReply);
    setCommentsCount(prev => prev + 1);
  };

  // Toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="border-t border-border/60">
      {/* Comments Toggle Button */}
      <div className="px-4 py-3">
        <Button
          variant="ghost"
          onClick={toggleComments}
          className="w-full justify-between text-muted-foreground hover:text-primary transition-colors"
        >
          <div className="flex items-center">
            <MessageCircle size={18} className="mr-2" />
            <span>{commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}</span>
          </div>
          <div className="flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {showComments ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 space-y-4">
          {/* Add Comment Input */}
          <CommentInput
            postId={postId}
            parentId={null} // null for direct comments to the post
            onCommentAdded={handleCommentAdded}
            placeholder="Write a comment..."
          />

          {/* Comments List */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <div className="h-8 w-8 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-16 bg-muted rounded-lg"></div>
                    <div className="h-3 w-20 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  onReplyAdded={handleReplyAdded}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No comments yet</p>
              <p className="text-xs">Be the first to comment!</p>
            </div>
          )}

          {/* Refresh Comments Button */}
          {comments.length > 0 && (
            <div className="text-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadComments}
                disabled={loading}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Refresh Comments
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;