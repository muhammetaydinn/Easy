import axios from 'axios';
import {baseUrl, header} from '../../constants/constants';

export const fetchNewsArticles = async (
  pageNumber: number,
  pageSize: number,
) => {
 
  try {
    const response = await axios.get(
      baseUrl +
        '/api/news?pageNumber=' +
        pageNumber.toString() +
        '&pageSize=' +
        pageSize.toString() +
        '&sortBy=creationTime',
      {
        headers: header,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};
