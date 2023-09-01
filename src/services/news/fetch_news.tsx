import axios from 'axios';
import {baseUrl} from '../../constants/constants';

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
        pageSize.toString(),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};
