import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, MoreHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CommentInput from './CommentInput';

const CommentItem = ({ 
  comment, 
  postId, 
  level = 0, 
  onReplyAdded,
  maxNestingLevel = 5 
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(true); // Show replies by default
  const [localReplies, setLocalReplies] = useState(comment.replies || []);

  // Format comment date
  const formatCommentDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Just now';
    }
  };

  // Handle reply added
  const handleReplyAdded = (newReply) => {
    setShowReplyInput(false);
    setShowReplies(true);
    
    // Add the new reply to local state
    setLocalReplies(prev => [...prev, newReply]);
    
    if (onReplyAdded) {
      onReplyAdded(newReply);
    }
  };

  // Calculate indentation based on nesting level
  const indentationClass = level > 0 ? `ml-${Math.min(level * 4, 16)}` : '';
  const canReply = level < maxNestingLevel;

  return (
    <div className={`${indentationClass}`}>
      <div className="flex gap-3 group">
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage 
            src={comment.author?.profileImage} 
            alt={comment.author?.username} 
          />
          <AvatarFallback className="text-xs">
            {comment.author?.username?.charAt(0).toUpperCase() || 
             comment.username?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* Comment Content */}
          <div className="bg-muted/50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 mb-1">
              <h5 className="font-medium text-sm">
                {comment.author?.firstName && comment.author?.lastName 
                  ? `${comment.author.firstName} ${comment.author.lastName}`
                  : comment.author?.username || comment.username || 'Unknown User'
                }
              </h5>
              <span className="text-xs text-muted-foreground">
                {formatCommentDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>

          {/* Comment Actions */}
          <div className="flex items-center gap-4 mt-1 px-3">
            {canReply && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors"
              >
                Reply
              </button>
            )}
            
            {localReplies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors flex items-center gap-1"
              >
                {showReplies ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                {showReplies ? 'Hide' : 'Show'} {localReplies.length} {localReplies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}

            <button className="text-xs text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={12} />
            </button>
          </div>

          {/* Reply Input */}
          {showReplyInput && (
            <div className="mt-3">
              <CommentInput
                postId={postId}
                parentId={comment.id} // Use comment.id as parentId for replies
                onCommentAdded={handleReplyAdded}
                placeholder={`Reply to ${comment.author?.firstName || comment.author?.username || comment.username}...`}
                size="small"
                onCancel={() => setShowReplyInput(false)}
                autoFocus={true}
              />
            </div>
          )}

          {/* Nested Replies */}
          {showReplies && localReplies.length > 0 && (
            <div className="mt-3 space-y-3">
              {localReplies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  level={level + 1}
                  onReplyAdded={onReplyAdded}
                  maxNestingLevel={maxNestingLevel}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;