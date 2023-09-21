import {baseUrl} from '../../constants/constants';
import {getHeader} from '../../utils/header';

export const uploadImage = async (selectedImage: any) => {
  console.log('selectedImage', selectedImage);
  var header = await getHeader();
  if (!selectedImage) {
    console.log('No image selected.');
    return;
  }
  // Create a form data object to send the image
  const formData = new FormData();
  formData.append('file', {
    uri: selectedImage,
    type: 'image/jpeg', // Change the type based on your image format
    name: 'image.jpg', // You can use any name you like here
  });
  try {
    //TODO: 
    // Send a POST request to your server with the image data   //check response  200 or other
    const response = await fetch(baseUrl + '/news/image', {
      method: 'POST',
      body: formData,
      headers: header,
    });
    if (response.ok) {
      const result = await response.text();
      console.log('Image uploaded successfully. Url:\t' + result);
      return result;
    } else {
      console.log('Image upload failed.');
      // Handle the error response from the server
    }
  } catch (error) {
    console.error('Image upload error:', error);
  }
};
