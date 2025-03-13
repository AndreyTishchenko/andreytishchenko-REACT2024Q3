// store/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: string;
  country: string;
  timestamp: number;
}

interface FormState {
  data: FormData[];
}

const initialState: FormState = {
  data: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FormData>) => {
      // Adding timestamp on submission
      state.data.push({ ...action.payload, timestamp: Date.now() });
    },
  },
});

export const { addData } = formSlice.actions;
export default formSlice.reducer;
