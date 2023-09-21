// send selected photo and get url

import { getHeader } from '../../utils/header';
import axiosInstance from '../axios/axios_instance';
import { uploadImage } from '../image/uploadImage';
import { getDataJSON } from '../storage/asyncStorage';

export const updateUser = async (userName: string, selectedImage: any) => {
  try {
    const user = await getDataJSON('user');
    const userId = user.userId;

    const url = await uploadImage(selectedImage);
    console.log('url', url);
    const body = {
      name: userName,
      image: url,
    };

    const response = await axiosInstance.patch('/user/' + userId, body);
    if (response.status === 200) {
      console.log('User updated successfully');
      console.log(response.data);
    } else {
      console.log('User update failed');
    }
  } catch (error) {
    console.log(error);
  }
};
