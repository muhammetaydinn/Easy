import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import {getDataJSON} from '../storage/asyncStorage';
import { getHeader } from '../../utils/header';


export const commentToNew = async (text: string, newsId: string) => {
  const user = await getDataJSON('user');
  const jwtToken = user.jwt;
  const userId = user.userId;
  var header = await getHeader();
  try {
    const response = await axios.post(
      `${baseUrl}/comment`,
      {
        text: text,
        author: {
          userId: userId,
        },
        newsId: newsId,
      },
      {
        headers: header
      },
    );
    if (response.status === 201) {
      console.log('Comment was added');
    }
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching news commentToNew:', error);
    throw error;
  }
};
