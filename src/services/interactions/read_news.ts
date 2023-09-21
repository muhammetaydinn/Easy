// {   "userId":"33804b0c-af1f-4668-b592-b47709b427ec",
//     "newsId":"7c445140-6f5d-4a33-9507-5503ab59514b"
// }

import axiosInstance from "../axios/axios_instance";
import { getDataJSON } from "../storage/asyncStorage";

// {{URL}}/user/records

export const readNews = async (newsId: string) => {
  const user = await getDataJSON('user');
  const userId = user.userId;
  const response = await axiosInstance.post(`/user/records`, {
    userId: userId,
    newsId: newsId,
  });
  //RESPONSE.DATA
  /*
 {
    "responseTime": "2023-09-18T17:18:06.268994",
    "userId": "33804b0c-af1f-4668-b592-b47709b427ec",
    "newsId": "7c445140-6f5d-4a33-9507-5503ab59514b",
    "repeatedReads": 2,
    "like": true,
    "bookmark": false
}
    */
  if (response.status === 201) {
      console.log('News was read', response.data);
      return "success";
  }
  console.log(response.data);
}