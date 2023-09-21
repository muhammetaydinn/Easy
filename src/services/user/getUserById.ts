import { baseUrl } from '../../constants/constants';
import { User } from '../../models/user';
import axiosInstance from '../axios/axios_instance';
//{{URL}}/user/fb6444de-ea4b-4a3e-ab37-c266bcc11d4f
export const getUserById = async (userId: string) => {
  console.log('endpoint', baseUrl + '/user/' + userId);

  try {
    const response = await axiosInstance.get('/user/' + userId,);
    if (response.status === 200) {
      console.log('User found');
      return response.data;
    } else {
      console.log('User not found');
      return {} as User;
    }
  } catch (error) {
    console.log(error);
  }
};
