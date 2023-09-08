import axios from 'axios';
import {baseUrl, header} from '../../constants/constants';

export const getAllCategoriesHiearachy = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/categories/hierarchy`,{headers:header});
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
