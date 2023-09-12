import {PayloadAction, createSlice} from '@reduxjs/toolkit';
export interface Register {
  email: string;
  password: string;
  name: string;
  userToken: string;
}
const initialState: Register = {
  email: '',
  password: '',
  name: '',
  userToken: '',
};
export const RegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<{email: string}>) => {
      state.email = action.payload.email;
    },
    setPassword: (state, action: PayloadAction<{password: string}>) => {
      state.password = action.payload.password;
    },
    setName: (state, action: PayloadAction<{name: string}>) => {
      state.name = action.payload.name;
    },
  },
});
export const {setEmail, setPassword, setName} = RegisterSlice.actions;
export default RegisterSlice.reducer;
