import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImagePlus, X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';
import { uploadToCloudinary } from '@/service/utils/uploadToCloudinary';
import { createPost } from '@/service/api/posts';
import { toast } from 'sonner';

const CreatePostForm = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Handle image selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
  };

  // Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !selectedImage) {
      toast.error('Please add some content or an image to your post');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // Upload image to Cloudinary if selected
      if (selectedImage) {
        setIsUploadingImage(true);
        try {
          const cloudinaryResponse = await uploadToCloudinary(selectedImage);
          imageUrl = cloudinaryResponse.url;
        } catch (error) {
          console.error('Image upload failed:', error);
          toast.error('Failed to upload image. Please try again.');
          setIsSubmitting(false);
          setIsUploadingImage(false);
          return;
        }
        setIsUploadingImage(false);
      }

      // Create post payload
      const postPayload = {
        content: content.trim(),
        image: imageUrl,
        visibility: 'PUBLIC'
      };

      console.log('Creating post with payload:', postPayload);

      // Submit post to backend
      const response = await createPost(postPayload);

      if (response.success) {
        toast.success('Post created successfully!');
        
        // Reset form
        setContent('');
        handleRemoveImage();
        
        // Notify parent component
        if (onPostCreated) {
          onPostCreated(response.data);
        }
      } else {
        toast.error(response.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User info and textarea */}
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={user?.profileImage} alt={user?.username} />
              <AvatarFallback>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="min-h-[80px] resize-none border-0 bg-muted/30 focus-visible:ring-1"
                maxLength={1000}
              />
              
              {/* Character count */}
              <div className="text-xs text-muted-foreground text-right">
                {content.length}/1000
              </div>
            </div>
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                disabled={isSubmitting}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Form actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors">
                  <ImagePlus size={18} />
                  <span>Add Photo</span>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || (!content.trim() && !selectedImage)}
              className="px-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploadingImage ? 'Uploading...' : 'Posting...'}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Post
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;