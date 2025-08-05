export const uploadToCloudinary = async (file) => {
  // check if the file is present or not
  if (!file) {
    throw new Error("No file provided for upload.");
  }
  // create a new formData instance to send to cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "taskSync"); // replace with your actual upload preset

  // calling the API of cloudinary to upload the file
  const res = await fetch("https://api.cloudinary.com/v1_1/dserujpq9/image/upload", {
    method: "POST",
    body: formData,
  });

  if(!res.ok) {
    const errorData = await res.json();
    throw new Error("Failed to upload file to Cloudinary.");
  }
  const data = await res.json();
  return {
    url: data.secure_url, // URL of the uploaded image
    publicId: data.public_id, // Public ID of the uploaded image
  };

}