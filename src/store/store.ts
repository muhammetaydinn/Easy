import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {LoginSlice} from './features/LoginSlice';
import {NewsSlice} from './features/NewsSlice';
import {PaginationSlice} from './features/PaginationSlice';
import {RegisterSlice} from './features/RegisterSlice';
import {UserSlice} from './features/UserSlice';
import { CommentSlice, PostSlice } from './features/GenericSlice';

export const store = configureStore({
  reducer: {
    LoginSlice: LoginSlice.reducer,
    RegisterSlice: RegisterSlice.reducer,
    NewsSlice: NewsSlice.reducer,
    UserSlice: UserSlice.reducer,
    PaginationSlice: PaginationSlice.reducer,
    SearchTrending: PaginationSlice.reducer,
    PostSlice: PostSlice.reducer,
    CommentSlice:CommentSlice.reducer
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fetchNews),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
