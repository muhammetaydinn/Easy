// send selected photo and get url

import axios from 'axios';
import {uploadImage} from '../image/uploadImage';
import {baseUrl} from '../../constants/constants';
import {getDataJSON} from '../storage/asyncStorage';
import {getHeader} from '../../utils/header';

export const updateUser = async (userName: string, selectedImage: any) => {
  try {
    const user = await getDataJSON('user');
    const userId = user.userId;
    const header = await getHeader();

    const url = await uploadImage(selectedImage);
    console.log('url', url);
    const body = {
      name: userName,
      image: url,
    };

    const response = await axios.patch(baseUrl + '/user/' + userId, body, {
      headers: header,
    });
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
