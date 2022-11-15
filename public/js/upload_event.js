// event listener for the upload button
document.addEventListener('DOMContentLoaded', async () => {
  // todo: might have to change the fetch route
  const response = await fetch('/api/widget');
  const data = await response.json();

  const options = {
    cloudName: data.cloudname,
    apiKey: data.apikey,
    uploadSignatureTimestamp: data.timestamp,
    uploadSignature: data.signature,
    cropping: false,
    folder: 'signed_upload_demo_uw'
  }

  const processResults = (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log(result)
      console.log(result.info.secure_url)

      document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url);
    }
  }

  const myWidget = window.cloudinary.createUploadWidget(
    options,
    processResults
  );

  document
    .getElementById('upload_widget')
    .addEventListener('click', () => {
      console.log('button pressed!!!!!!!!!!!')
      myWidget.open()
    }, false)
});
