import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Content, Root } from '../../models/news';
import axiosInstance from '../../services/axios/axios_instance';
import { getDataJSON } from '../../services/storage/asyncStorage';
//interface
export interface News {
  news: Content[];
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  isListEnd: boolean;
}
//initial state
const initialState: News = {
  news: [],
  pageNumber: 1,
  pageSize: 10,
  loading: false,
  error: null,
  isListEnd: false,
};
///news?pageNumber=1&pageSize=20&sortBy=creationTime
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({pageNumber, pageSize}: {pageNumber: number; pageSize: number}) => {
    //check is the list is end
    console.log('fetchNews');

    const response = await axiosInstance.get(
      `/news?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=creationTime`,
    );
    // const data = await response.data;
    // console.log(data);
    // console.log(data.content);
    return response.data as Root;
  },
);

export const addCommentToNews = createAsyncThunk(
  'news/addCommentToNews',
  async (params: {newsId: string; comment: string; thunkAPI?: any}) => {
    console.log('addCommentToNews');
    const user = await getDataJSON('user');
    const response = await axiosInstance.post(`/comments`, {
      text: params.comment,
        userId: user.userId,
      newsId: params.newsId,
    });
    if (response.status === 201) {
      console.log('Comment was added');
      return {
        comment: {
          userId: user.userId,
          text: params.comment,
          newsId: params.newsId,
        },
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
    setPageNumber(state, action: PayloadAction<number>) {
      console.log('setPageNumber', state.pageNumber);
      state.isListEnd ? {} : (state.pageNumber = action.payload);
    },
  },
  extraReducers: builder => {
    //fulffilled means  that the promise was resolved
    //rejected means that the promise was rejected
    //pending means that the promise is still pending
    builder
      .addCase(fetchNews.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        if (action.payload.content.length > 0) {
          state.news.push(...action.payload.content);
          state.loading = false;
        } else {
          state.loading = false;
          //TODO: bundan emin değilim
          // state.isListEnd = true;
        }
        if (action.payload.last == true) {
          state.isListEnd = true;
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        //TODO: bundan emin değilim
        // state.isListEnd = true;r
        state.loading = false;
        state.error = action.error.message || 'Error fetching news';
      });

    //addCommentToNews
    builder.addCase(addCommentToNews.fulfilled, (state, action) => {
      //find the news that has the same newsId as the newsId of the comment and assign the comment to it
      //   state.news
      //     .find((news: Content) => news.newsId === action.payload.newsId)
      //     ?.comments?.unshift(action.payload.comment ?? ({} as Comment));
      //
      console.log('addCommentToNews.fulfilled');
    });
  },
});
//just reducer not extra reducers
export const {setPageNumber} = NewsSlice.actions;
export default NewsSlice.reducer;
