import axios from 'axios';
import {baseUrl, header} from '../../constants/constants';

export const commentToNew = async (
  text: string,

  userId: string,
  newsId: string,
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/comment`,
      {
        text: text,
        author: {
          userId: 'fdb3181c-2ba7-438c-aff7-6885f094b6cd',
        },
        newsId: 'ade5f6e1-d990-4f8e-91d0-f2956fd5c61e',
      },
      {headers: header},
    );
      if (response.status === 200) {
        console.log('Comment was added');
    }
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching news commentToNew:', error);
    throw error;
  }
};
