import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { createComment } from '@/service/api/comments';
import { toast } from 'sonner';

const CommentInput = ({ 
  postId, 
  parentId = null, // This will be the comment ID we're replying to
  onCommentAdded, 
  placeholder = "Write a comment...",
  size = "default",
  onCancel = null,
  autoFocus = false
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Please write something before posting');
      return;
    }

    setIsSubmitting(true);

    try {
      const commentData = {
        content: content.trim(),
        parentId: parentId // null for direct comments, comment ID for replies
      };

      console.log('Creating comment with data:', commentData);

      const response = await createComment(postId, commentData);

      if (response.success) {
        toast.success(parentId ? 'Reply posted!' : 'Comment posted!');
        setContent('');
        
        // Notify parent component
        if (onCommentAdded) {
          onCommentAdded(response.data);
        }
        
        // Call cancel function if it's a reply input to hide it
        if (onCancel && parentId) {
          onCancel();
        }
      } else {
        toast.error(response.message || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const avatarSize = size === "small" ? "h-8 w-8" : "h-10 w-10";
  const textareaHeight = size === "small" ? "min-h-[60px]" : "min-h-[80px]";

  return (
    <div className="flex gap-3">
      <Avatar className={`${avatarSize} flex-shrink-0`}>
        <AvatarImage src={user?.profileImage} alt={user?.username} />
        <AvatarFallback className={size === "small" ? "text-xs" : "text-sm"}>
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </AvatarFallback>
      </Avatar>
      
      <form onSubmit={handleSubmit} className="flex-1 space-y-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className={`${textareaHeight} resize-none bg-muted/50 border-0 focus-visible:ring-1`}
          maxLength={1000}
          autoFocus={autoFocus}
        />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {content.length}/1000
          </span>
          
          <div className="flex gap-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="mr-1 h-3 w-3" />
                  {parentId ? 'Reply' : 'Comment'}
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;