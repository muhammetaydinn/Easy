// import { getHeader } from '../../utils/header';
// import axiosInstance from '../axios/axios_instance';
// import { getDataJSON } from '../storage/asyncStorage';

import {getHeader} from '../../utils/header';
import axiosInstance from '../axios/axios_instance';
import {getDataJSON} from '../storage/asyncStorage';

// export const postNew = async (
//   title: string,
//   text: string,

//   categoryId: number,

//   image?: string,
// ) => {
//   const user = await getDataJSON('user');
//   const userId = user.userId;
//   try {
//     const response = await axiosInstance.post(
//       `/news`,
//       {
//         title: title,
//         text: text,
//         image: image,
//         author: {
//           userId: userId,
//         },
//         category: {
//           categoryId: categoryId??1,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error posting news articles:', error);
//     throw error;
//   }
// };
export const postNew = async (
  selectedImage: any,
  category: string,
  title: string,
  text: string,
) => {
  const user = await getDataJSON('user');
  const jwtToken = user.jwt;
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      Authorization: 'Bearer ' + jwtToken,
    },
  };

  const formData = new FormData();
  formData.append('userId', user.userId);
  formData.append('category', category);
  formData.append('title', title);
  formData.append('text', text);
  formData.append('image', {
    uri: selectedImage,
    type: 'image/jpeg',
    name: 'image.jpg',
    
  });
  console.log('formData', formData);
  console.log('config', config);

  axiosInstance
    .post('/news', formData, config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('error', error);
    });
};
