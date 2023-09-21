import axiosInstance from '../axios/axios_instance';

export const getAllCategoriesHiearachy = async () => {
  try {
    const response = await axiosInstance.get(`/categories/hierarchy`);
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
