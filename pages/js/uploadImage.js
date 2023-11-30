// uploadImage.js

function uploadImage(file) {
    const cloudinaryUploadPreset = 'thwiat6p';
    const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/diukwdy4w/upload';
      
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryUploadPreset);
  
    return fetch(cloudinaryAPI, {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          console.error('Cloudinary Error Response:', response);
          throw new Error('Image upload failed. Check Cloudinary configuration and file type.');
        }
        return response.json();
      })
      .then(data => {
        // Include the image URL in the response
        return data.secure_url;
      })
      .catch(error => {
        console.error('Image upload failed:', error);
        throw error;
      });
  }
  console.log("Hiiiii")