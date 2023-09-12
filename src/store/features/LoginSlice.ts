import {PayloadAction, createSlice} from '@reduxjs/toolkit';
export interface Login {
  email: string;
  password: string;
}
const initialState: Login = {
  email: '',
  password: '',
};
export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<Login>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});
export const {setText} = LoginSlice.actions;
export default LoginSlice.reducer;
