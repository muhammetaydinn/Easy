// import axiosInstance from '../axios/axios_instance';
// import {getDataJSON} from '../storage/asyncStorage';

// export const commentToNew = async (text: string, newsId: string) => {
//   const user = await getDataJSON('user');
//   const userId = user.userId;
//   try {
//     const response = await axiosInstance.post(`/comment`, {
//       text: text,

//       userId: userId,

//       newsId: newsId,
//     });
//     if (response.status === 201) {
//       console.log('Comment was added');
//     }
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error fetching news commentToNew:', error);
//     throw error;
//   }
// };
