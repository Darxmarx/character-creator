const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// configure the cloud name, api key and api secret
const myconfig = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
  });

exports.myconfig = myconfig;