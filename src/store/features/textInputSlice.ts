// textInputSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface TextInput {
  value: string;
}

const initialState: TextInput = {
  value: '',
};

export const TextInputSlice = createSlice({
  name: 'textInput',
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const {setInputValue} = TextInputSlice.actions;
export default TextInputSlice.reducer;
