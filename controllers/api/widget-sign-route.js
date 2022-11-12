// const { Router } = require('express');
// require('dotenv').config();
const express = require('express');
const router = express.Router();
const signature = require('../../utils/signatureWidget');
// const myconfig = require('../../public/js/cloudinary_config');
require('../../public/js/cloudinary_config');
const cloudinary = require('cloudinary').v2;
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;


// using this API should require authentication
router.get('/', (req, res, next) => {
    const uploadSignature = signature.signUploadWidget()
    console.log(`uploadsignature@@@@@@@@@@@@@@@@@@@@${JSON.stringify(uploadSignature)}@@@@@@@@@@@@@@@@@@@@@@@@`)
    res.json({
        signature: uploadSignature.signature,
        timestamp: uploadSignature.timestamp,
        cloudname: cloudName,
        apikey: apiKey
    })
})

module.exports = router;