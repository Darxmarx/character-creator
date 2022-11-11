
// todo: the event listener for the upload button

buttonel = document.querySelector('#button');

// event listener for the upload button
document.addEventListener('DOMContentLoaded', async () => {
    // todo: might have to change the fetch route
    const response = await fetch('/api/signuploadwidgetRouter');
    const data = await response.json();

    const options = {
        cloudName: data.cloudname,
        apiKey: data.apikey,
        uploadSignatureTimestamp: data.timestamp,
        uploadSignature: data.signature,
        cropping: false,
        folder: 'signed_upload_demo_uw'
      }


    // function for the window to create an uplaod widget
    const uploadWidget = window.cloudinary.createUploadWidget(options, (error, result) => {

        if (!error && result && result.event === 'success') {
            console.log(result)

            var str = JSON.stringify(result, null, 4);
            document.getElementById("uwdata").innerHTML += str;
        }
    })

    document.getElementById('upload_widget').addEventListener('click', () => {
        uploadWidget.open();
    }, false);

})