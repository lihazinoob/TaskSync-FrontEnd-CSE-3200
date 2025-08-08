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
    <div className="w-1/2 "> {/* ✅ Changed to w-1/2 to cover half screen width */}
      <Card className="w-full">
        <CardHeader className="pb-6"> {/* ✅ Increased padding bottom */}
          <CardTitle className="text-2xl font-bold">Create a Post</CardTitle> {/* ✅ Increased font size and weight */}
        </CardHeader>
        <CardContent className="space-y-6"> {/* ✅ Increased spacing */}
          <form onSubmit={handleSubmit} className="space-y-6"> {/* ✅ Increased spacing */}
            {/* User info and textarea */}
            <div className="flex gap-6"> {/* ✅ Increased gap */}
              <Avatar className="h-16 w-16 flex-shrink-0"> {/* ✅ Increased avatar size significantly */}
                <AvatarImage src={user?.profileImage} alt={user?.username} />
                <AvatarFallback className="text-xl font-semibold"> {/* ✅ Increased font size and weight */}
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="min-h-[120px] max-h-[200px] resize-none border-0 bg-muted/30 focus-visible:ring-1 text-lg" // ✅ Increased heights and font size
                  maxLength={1000}
                />
                
                {/* Character count */}
                <div className="text-base text-muted-foreground text-right mt-3"> {/* ✅ Increased font size and margin */}
                  {content.length}/1000
                </div>
              </div>
            </div>

            {/* Image preview */}
            {imagePreview && (
              <div className="relative max-w-2xl mx-auto"> {/* ✅ Increased from lg to 2xl */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-80 object-cover rounded-lg border" // ✅ Increased max height to 80
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg" // ✅ Increased padding and positioning
                  disabled={isSubmitting}
                >
                  <X size={20} /> {/* ✅ Increased icon size */}
                </button>
              </div>
            )}

            {/* Form actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border/60"> {/* ✅ Increased padding top */}
              <div className="flex items-center">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center gap-3 px-6 py-3 text-base text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"> {/* ✅ Increased padding, gap, and font size */}
                    <ImagePlus size={22} /> {/* ✅ Increased icon size */}
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
                className="px-8 py-3 h-12 text-base" // ✅ Increased padding, height, and font size
                size="lg" // ✅ Changed to large size
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" /> {/* ✅ Increased icon size and margin */}
                    {isUploadingImage ? 'Uploading...' : 'Posting...'}
                  </>
                ) : (
                  <>
                    <Send className="mr-3 h-5 w-5" /> {/* ✅ Increased icon size and margin */}
                    Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostForm;