const cloudinary = require('cloudinary').v2;
require('../public/js/cloudinary_config');

const apiSecret = cloudinary.config().api_secret;

// function used to sign an uploadWidget upload
const signUploadWidget = () => {
    // get the timestamp and round down
    const timestamp = Math.round((new Date).getTime()/1000);

    const signature = cloudinary.utils.api_sign_request({
        timestamp: timestamp,
        source: 'uw',
        folder: 'signed_uploads'
    }, apiSecret);

    return {timestamp, signature}
}

module.exports = {signUploadWidget}

