import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import { getHeader } from '../../utils/header';

export const getAllCategoriesHiearachy = async () => {
  var header = await getHeader();
  try {
    const response = await axios.get(`${baseUrl}/categories/hierarchy`,{headers:header});
    console.log(response.data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.log('status : ', response.status);
    }
  } catch (error) {
    console.error(error);
  }
};
