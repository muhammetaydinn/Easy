import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import { getHeader } from '../../utils/header';
import { getDataJSON } from '../storage/asyncStorage';

export const postNew = async (
  title: string,
  text: string,


  categoryId: number,

  image?: string,
) => {
  const user = await getDataJSON('user');
  const userId = user.userId;
  try {
      var header = await getHeader();
    const response = await axios.post(
      `${baseUrl}/news`,
      {
        title: title,
        text: text,
        image: image,
        author: {
          userId: userId,
        },
        category: {
          categoryId: categoryId??1,
        },
      },
      {headers: header},
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};
