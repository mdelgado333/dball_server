import { v2 as cloudinary } from 'cloudinary';
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'dy43yiydr', 
    api_key: '295559745613679', 
    api_secret: 'NyQvwL6yIz7ekHf6O9yFBH8XKG8'
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET,
  })

const storage = new CloudinaryStorage({cloudinary , 
    params: {
      allowed_formats: ['mp4', 'jpg', 'png'],
      resource_type: 'auto'
    }
  })