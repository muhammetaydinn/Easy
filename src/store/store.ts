import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {LoginSlice} from './features/LoginSlice';
import { RegisterSlice } from './features/RegisterSlice';
import { NewsSlice } from './features/NewsSlice';

export const store = configureStore({
  reducer: {
    LoginSlice: LoginSlice.reducer,
    RegisterSlice: RegisterSlice.reducer,
    NewsSlice: NewsSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
