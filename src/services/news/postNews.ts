import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import { getHeader } from '../../utils/header';

export const postNew = async (
  title: string,
  text: string,

  userId: string,

  categoryId: number,

  image?: string,
) => {
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
          categoryId: categoryId,
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
