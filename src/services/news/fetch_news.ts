import { getHeader } from '../../utils/header';
import axiosInstance from '../axios/axios_instance';

export const fetchNewsArticles = async (
  pageNumber: number,
  pageSize: number,
) => {

  try {
    const response = await axiosInstance.get(
      '/news?pageNumber=' +
        pageNumber.toString() +
        '&pageSize=' +
        pageSize.toString() +
        '&sortBy=creationTime',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};
