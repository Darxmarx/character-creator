const { Router } = require('express');
const express = require('express');
const router = express.Router();
const signature = require('../../utils/signatureWidget');
require('../../public/js/cloudinary_config');

const cloudinary = require('cloudinary').v2;
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

// using this API should require authentication
router.get('/', (req, res, next) => {
    const uploadSignature = signature.signUploadWidget()
    res.json({
        signature: uploadSignature.signature,
        timestamp: uploadSignature.timestamp,
        cloudName: cloudName,
        apiKey: apiKey
    })
})

module.exports = router;