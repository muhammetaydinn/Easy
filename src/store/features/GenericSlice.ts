import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axios/axios_instance";

export interface GenericState<T> {
    //TODO: bu ikisini sil
  name: string;
  age: number;
  data?: T[];
}

// Define the createGenericSlice function
function createGenericSlice({
  sliceName,
  initialState,
  apiUrl,
}: {
  sliceName: string;
  initialState: GenericState<any>;
  apiUrl: string;
}) {
  // Define your async thunk function
  const fetchPerson = createAsyncThunk(`${sliceName}/fetchPerson`, async () => {
    //   await test();
    const response = await axiosInstance.get(apiUrl);

    if (response.status !== 200) {
      console.log('error');
      throw new Error('Error!');
    }

    return response.data;
  });
  const slice = createSlice({
    name: sliceName,
    initialState: initialState,
    reducers: {
      // Define your reducers here
      changeName(state, action) {
        state.name = action.payload;
      },
    },
    extraReducers: builder => {
      builder
        .addCase(fetchPerson.pending, state => {})
        .addCase(fetchPerson.fulfilled, (state, action) => {
          state.name = action.payload.body;
        })
        .addCase(fetchPerson.rejected, (state, action) => {
          console.log('rejected');
        });

      // Add other extra reducers as needed
    },
  });

  const selectCount = (state: any) => state[sliceName].value;

  return {
    fetchPerson,
    slice,
    reducer: slice.reducer,
    actions: slice.actions,
    selectCount,
  };
}

// Usage:
export const PostSlice = createGenericSlice({
  sliceName: '1',
  initialState: {
    age: 12,
    name: 'test',
    data: [] as Posts[],
  },
  apiUrl: 'https://jsonplaceholder.typicode.com/posts/5',
});
export const CommentSlice = createGenericSlice({
  sliceName: '2',
  initialState: {
    age: 18,
    name: 'testt2',
    data: [] as Comments[],
  },
  apiUrl: 'https://jsonplaceholder.typicode.com/comments/5',
});

// useDispatch and useSelector should be used inside a React component or function component
// For example, in a React functional component:

// const dispatch = useDispatch();
// const count1 = useSelector(slice1.selectCount);
// dispatch(slice1.thunk());

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}