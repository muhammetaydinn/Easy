import axios from 'axios';
import {baseUrl} from '../../constants';

export const fetchNewsArticles = async () => {
  try {
    const response = await axios.get(baseUrl + '/api/news');
    return response.data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};
