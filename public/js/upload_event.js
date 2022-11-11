// todo: the event listener for the upload button

buttonel = document.querySelector('#button');

// event listener for the upload button
document.addEventListener('DOMContentLoaded', async () => {
    // todo: might have to change the fetch route
    const response = await fetch('/api/signuploadwidgetRouter');
    const data = await response.json();

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    console.log(JSON.stringify(data));
    console.log(data);

    const options = {
        cloudName: data.cloudname,
        apiKey: data.apikey,
        uploadSignatureTimestamp: data.timestamp,
        uploadSignature: data.signature,
        cropping: false,
        folder: 'signed_uploads'
    }

    // function for the window to create an uplaod widget
    const uploadWidget = window.cloudinary.createUploadWidget(options, (err, result) => {
        console.log()
        if(!err && result && result.event === 'success') {
            console.log(result);

            var resultString = JSON.stringify(result, null, 4);
            document.getElementById('uwdata').innerHTML += resultString;
        }
    })

    document.getElementById('upload_widget').addEventListener('click', () => uploadWidget.open(), false);
})