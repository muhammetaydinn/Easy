import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PaginationModel} from '../../models/pagination';
import axiosInstance from '../../services/axios/axios_instance';
export interface Pagination {
  content: Array<any>;

  pageNumber: number;
  pageSize: number;
  loading: boolean;
  error: null | string;
  isListEnd: boolean;
}
const initialState: Pagination = {
  content: [],
  loading: false,
  error: '',
  isListEnd: false,
  pageNumber: 1,
  pageSize: 1,
};
//?pageNumber=1&pageSize=20&sortBy=
export const fetchData = createAsyncThunk(
  'pagination/fetchData',
  async ({
    apiUrl,
    page,
    pageSize,
  }: {
    apiUrl: string;
    page: number;
    pageSize: number;
  }) => {
    //TODO
    try {
      console.log('fetchData', apiUrl, page, pageSize);
      const response = await axiosInstance.get(apiUrl, {
        params: {
          pageNumber: page,
          pageSize: pageSize,
          // sortBy: 'id',
        },
      });
      console.log(response.data.content);
      return response.data as PaginationModel;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const PaginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageNumber(state, action: PayloadAction<number>) {
      console.log('setPageNumber', state.pageNumber);
      state.isListEnd ? {} : (state.pageNumber = action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        //content
        if (action.payload.content.length > 0) {
          state.content.push(...action.payload.content);
        } else {
          state.isListEnd = true;
        }
        if (action.payload.last == true) {
          state.isListEnd = true;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.isListEnd = true;
        state.error = action.error.message || 'Error fetching data';
      });
  },
});
export const {setPageNumber} = PaginationSlice.actions;
export default PaginationSlice.reducer;
