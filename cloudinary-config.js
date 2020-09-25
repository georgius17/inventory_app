const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
  cloud_name: 'dndibfvkz',
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'samples',
    formats: async (req, file) => ['jpg', 'png'],
    transformation: [{ width: 405, height: 270, crop: 'limit' }],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;