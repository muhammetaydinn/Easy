import axios from 'axios';
import {baseUrl} from '../../constants/constants';
import {Comment, Content, Root} from '../../models/news';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getDataJSON} from '../../services/storage/asyncStorage';
import {getHeader} from '../../utils/header';
//interface
export interface News {
  news: Content[];
}
//initial state
const initialState: News = {
  news: [],
};

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  var header = await getHeader();

  const response = await axios.get(baseUrl + `/news`, {
    headers: header,
  });
  const data = await response.data;
  console.log(data);
  console.log(data.content);
  return data.content;
});

export const addCommentToNews = createAsyncThunk(
  'news/addCommentToNews',
  async (params: {newsId: string; comment: string; thunkAPI?: any}) => {
    const user = await getDataJSON('user');
    var header = await getHeader();
    const response = await axios.post(
      baseUrl + `/comment`,
      {
        text: params.comment,
        author: {
          userId: user.userId,
        },
        newsId: params.newsId,
      },
      {
        headers: header,
      },
    );
    if (response.status === 201) {
      console.log('Comment was added');
      return {
        comment: {
          author: {
            userId: user.userId,
            name: user.name,
            role: user.role,
            image: user.image,
            userToken: user.userToken,
          },
          text: params.comment,
          creationTime: new Date().toISOString(),
          commentUUID: '',
        } as Comment,
        newsId: params.newsId,
      };
    } else {
      return {
        newsId: params.newsId,
      };
    }
  },
);

//slice
export const NewsSlice = createSlice({
  //slice name
  name: 'news',
  //slice initial state
  initialState,
  //slice reducers
  reducers: {
    setNews: (state, action: PayloadAction<Content[]>) => {
      state.news = action.payload;
    },
  },
  extraReducers: builder => {
    //fulffilled means  that the promise was resolved
    //rejected means that the promise was rejected
    //pending means that the promise is still pending
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
    builder.addCase(addCommentToNews.fulfilled, (state, action) => {
      //find the news that has the same newsId as the newsId of the comment and assign the comment to it
      state.news
        .find((news: Content) => news.newsId === action.payload.newsId)
        ?.comments?.unshift(action.payload.comment ?? ({} as Comment));
    });
  },
});
//just reducer not extra reducers
export const {setNews} = NewsSlice.actions;
export default NewsSlice.reducer;
