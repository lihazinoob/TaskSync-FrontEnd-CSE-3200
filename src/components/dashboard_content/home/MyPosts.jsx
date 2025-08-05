import { Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react";
import { useState } from "react";

const posts = [
  {
    id: 1,
    content:
      "Just completed a React certification course! Looking forward to applying these new skills to build more robust applications.",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2 days ago",
    likes: 42,
    comments: 8,
    shares: 5,
    author: {
      name: "You",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "Frontend Developer",
    },
  },
  {
    id: 2,
    content:
      "Excited to share that I've been invited for an interview at TechCorp for a Senior Frontend Developer position! Any advice from someone who's worked there before?",
    date: "1 week ago",
    likes: 76,
    comments: 15,
    shares: 2,
    author: {
      name: "You",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "Frontend Developer",
    },
  },
  {
    id: 3,
    content:
      "I just published an article on 'Modern React Patterns for 2023' on Dev.to. Check it out and let me know your thoughts!",
    link: {
      url: "https://dev.to/article/modern-react-patterns",
      title: "Modern React Patterns for 2023",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    date: "2 weeks ago",
    likes: 124,
    comments: 32,
    shares: 18,
    author: {
      name: "You",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      title: "Frontend Developer",
    },
  },
];

const MyPosts = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const toggleExpand = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl border bg-card overflow-hidden"
        >
          {/* Post header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>{post.author.title}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
            <button className="text-muted-foreground hover:bg-muted p-1.5 rounded-full">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Post content */}
          <div className="px-4 pb-3">
            <p
              className={`text-sm ${
                post.content.length > 150 && expandedPostId !== post.id
                  ? "line-clamp-3"
                  : ""
              }`}
            >
              {post.content}
            </p>
            {post.content.length > 150 && (
              <button
                onClick={() => toggleExpand(post.id)}
                className="text-xs text-primary mt-1 font-medium"
              >
                {expandedPostId === post.id ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {/* Post image if available */}
          {post.image && (
            <div className="mt-2 w-full">
              <img
                src={post.image}
                alt="Post content"
                className="w-full object-cover max-h-80"
              />
            </div>
          )}

          {/* Link preview if available */}
          {post.link && (
            <div className="mx-4 mb-4 mt-3 border rounded-lg overflow-hidden">
              <div className="h-36 overflow-hidden bg-muted">
                <img
                  src={post.link.image}
                  alt={post.link.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 bg-muted/30">
                <h4 className="font-medium text-sm">{post.link.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {post.link.url}
                </p>
              </div>
            </div>
          )}

          {/* Post metrics */}
          <div className="px-4 py-2 border-t border-border/60 flex justify-between items-center text-muted-foreground">
            <div className="flex gap-6">
              <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                <Heart size={16} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
                <MessageCircle size={16} />
                <span>{post.comments}</span>
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-sm hover:text-primary transition-colors">
              <Share2 size={16} />
              <span>{post.shares}</span>
            </button>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button className="text-sm text-primary font-medium hover:underline">
          View all posts
        </button>
      </div>
    </div>
  );
};

export default MyPosts;
