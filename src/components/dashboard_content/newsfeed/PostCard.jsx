import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal, Globe, Users, Lock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [showFullContent, setShowFullContent] = useState(false);

  // Handle like toggle
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    // TODO: Implement API call to like/unlike post
  };

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

        {/* Post Actions */}
        <div className="px-4 py-3 border-t border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isLiked 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Heart size={18} className={isLiked ? 'fill-current' : ''} />
                <span>{likesCount}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle size={18} />
                <span>{post.commentsCount || 0}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Share2 size={18} />
                <span>{post.sharesCount || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;