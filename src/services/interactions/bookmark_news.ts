/*
{
    "userId": "33804b0c-af1f-4668-b592-b47709b427ec",
    "newsId":"7c445140-6f5d-4a33-9507-5503ab59514b",
    "bookmark":"true"
}
*/
//{{URL}}/news/interactions

import axiosInstance from "../axios/axios_instance";
import { getDataJSON } from "../storage/asyncStorage";

export const bookmarkNews = async (newsId: string,bookmark:boolean) => {
    const user = await getDataJSON('user');
    const userId = user.userId;
   const response = await axiosInstance.post(`/news/interactions`, {
     userId: userId,
     newsId: newsId,
     bookmark: bookmark,
   });
    //RESPONSE.DATA
    /*
    {
    "newsId": "7c445140-6f5d-4a33-9507-5503ab59514b",
    "likes": 1,
    "bookmarks": 0,
    "views": 1
}*/
    
    if (response.status === 200) {
        console.log('News was bookmarked', response.data);
         return response.data.bookmark;
    }
    console.log(response.data);
    return null;
};
    