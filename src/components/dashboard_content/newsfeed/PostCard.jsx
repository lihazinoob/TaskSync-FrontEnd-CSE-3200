import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Globe, Users, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import CommentsSection from './CommentsSection';

const PostCard = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  // Format post date
  const formatPostDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  // Get visibility icon
  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'PUBLIC':
        return <Globe size={14} />;
      case 'FRIENDS':
        return <Users size={14} />;
      case 'PRIVATE':
        return <Lock size={14} />;
      default:
        return <Globe size={14} />;
    }
  };

  // Truncate content if too long
  const shouldTruncate = post.content && post.content.length > 300;
  const displayContent = shouldTruncate && !showFullContent 
    ? post.content.substring(0, 300) + '...'
    : post.content;

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author?.profileImage} alt={post.author?.username} />
              <AvatarFallback>
                {post.author?.username?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">
                  {post.author?.firstName && post.author?.lastName 
                    ? `${post.author.firstName} ${post.author.lastName}`
                    : post.author?.username || 'Unknown User'
                  }
                </h4>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getVisibilityIcon(post.visibility)}
                  <span className="text-xs capitalize">{post.visibility.toLowerCase()}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {post.author?.jobTitle || 'User'} • {formatPostDate(post.createdAt)}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        {/* Post Content */}
        {post.content && (
          <div className="px-4 pb-3">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {displayContent}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-xs text-primary font-medium mt-1 hover:underline"
              >
                {showFullContent ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="w-full">
            <img
              src={post.image}
              alt="Post content"
              className="w-full max-h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => {
                // TODO: Implement image lightbox/modal
                console.log('Open image in lightbox');
              }}
            />
          </div>
        )}

        {/* Comments Section */}
        <CommentsSection 
          postId={post.id} 
          initialCommentsCount={post.commentsCount || 0}
        />
      </CardContent>
    </Card>
  );
};

export default PostCard;