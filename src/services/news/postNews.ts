import axios from 'axios';
import {baseUrl, header} from '../../constants/constants';

export const postNew = async (
  title: string,
  text: string,

  userId: string,

  categoryId: number,

  image?: string,
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/news`,
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
