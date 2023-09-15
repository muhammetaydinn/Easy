import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Follower, initalFollowers } from '../../models/follower';
import axiosInstance from '../../services/axios/axios_instance';

//interface
export interface User {
  followers: Follower;
  following: Follower;
  pageNumber: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  isListEnd: boolean;
}
//initial state
const initialState: User = {
  followers: initalFollowers,
  following: initalFollowers,
  pageNumber: 1,
  //TODO TESTING 1 RELEASE 20
  pageSize: 1,
  loading: false,
  error: null,
  isListEnd: false,
};
//{{URL}}/user/following/fb6444de-ea4b-4a3e-ab37-c266bcc11d4f?pageNumber=1&pageSize=10
//{{URL}}/user/followers/33804b0c-af1f-4668-b592-b47709b427ec?pageNumber=1&pageSize=10
export const getFollowers = createAsyncThunk(
  'user/getFollowers',
  async ({
    pageNumber,
    pageSize,
    userId,
  }: {
    pageNumber: number;
    pageSize: number;
    userId: string;
  }) => {
    console.log('getFollowers', pageNumber, pageSize, userId);
    try {
      const response = await axiosInstance.get(
        `/user/following/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      );
      console.log('follower responsedata', response.data);
      return response.data;
    } catch (error) {
      console.log('Error getFollowers', error);
    }
  },
);
export const getFollowing = createAsyncThunk(
  'user/getFollowing',
  async ({
    pageNumber,
    pageSize,
    userId,
  }: {
    pageNumber: number;
    pageSize: number;
    userId: string;
  }) => {
    console.log('getFollowing', pageNumber, pageSize, userId);
    try {
      const response = await axiosInstance.get(
        `/user/followers/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      );
      console.log('following responsedata', response.data);
      return response.data;
    } catch (error) {
      console.log('Error getFollowing', error);
    }
  },
);

//slice
export const UserSlice = createSlice({
  //slice name
  name: 'user',
  //slice initial state
  initialState,
  //slice reducers
  reducers: {
    setPageNumber(state, action: PayloadAction<number>) {},
  },
  extraReducers: builder => {
    builder
      .addCase(getFollowers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
      });
    
    builder.addCase(getFollowing.pending, (state, action) => {
      state.loading = true;
    })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      }
    )
      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
      }
    );
    
  },
});
//just reducer not extra reducers
export const {setPageNumber} = UserSlice.actions;
export default UserSlice.reducer;
