import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import {getDataJSON} from '../storage/asyncStorage';
import { getHeader } from '../../utils/header';

export const fetchNewsArticles = async (
  pageNumber: number,
  pageSize: number,
) => {
 var header = await getHeader();

  try {
    const response = await axios.get(
      baseUrl +
        '/news?pageNumber=' +
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
