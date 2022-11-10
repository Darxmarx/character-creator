// require cloudinary library
const cloudinary = require('cloudinary').v2;

// Return https urls by setting secure: true
cloudinary.config({
    secure: true
    // other configuration parameters:
    // https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters
});

// log the configuration
console.log(cloudinary.config());

cloudinary.setCloudName('dnqaq9up8');


















// upload an image file
const uploadImg = async (imagePath) => {

    // without these parameters, a random public id would be generated resulting in a 
    // new asset being created in your media library each time you ran this function
    const options = {
        use_filename: true, // sets the public ID to the filename of the uploaded file
        unique_filename: false, // does not appli random characters to the public id 
        overwrite: true, // overwrites any image with the same public id on upload


    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.public_id;
    } catch (err) {
        console.error(err);
    }
}

// gets details of an uploaded image
const getAssetInfo = async (publicId) => {
    // Return colors in the response
    const options = {
        colors: true
    };

    try {
        // Get details about the asset
        // resource method of the admin api is used to return specific details about the image
        // admin api is rate limited unlike the upload api which is rate unlimited
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
    } catch (err) {
        console.log(err);
    }
};

// Transform the image
// Creates an html image tag with a transformation that results in a circular thumbnail crop of the image
// focuses on the faces, applying an outline of the first color, and setting a background of the second color
const createImageTag = (publicId, ...colors) => {
    
    // set the effect color and background color
    const [effectColor, backgroundColor] = colors;

    // cloudinary.image method of Node.js sdk is used to createa an html image tag, 
    // with the src url set to the rul of the uploaded asset, but with transformation
    // parameters applied
    // to return only the url and not the whole tag:
    // replace cloudinary.image with cloudnary.url
    let imageTag = cloudinary.image(publicId, {
        // transformation reference:
        // https://cloudinary.com/documentation/transformation_reference
        transformation: [
            {width: 250, height: 250, gravity: 'faces', crop: 'thumb'},
            {radius: 'max'},
            {effect: 'outline:10', color: effectColor },
            {background: backgroundColor },
        ],
    });

    return imageTag;
}