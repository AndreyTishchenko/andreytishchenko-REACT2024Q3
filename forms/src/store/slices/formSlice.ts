import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../types/formData';


interface FormState {
  submissions: FormData[];
  countries: string[];
}

const initialState: FormState = {
  submissions: [],
  countries: [
    'United States',
    'Canada',
    'Mexico',
    'United Kingdom',
    'Germany',
    'France',
    'Australia'
  ],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormData>) => {
      state.submissions.push({ ...action.payload, isNew: true });
    },
    clearNewFlags: (state) => {
      state.submissions = state.submissions.map((sub) => ({ ...sub, isNew: false }));
    },
  },
});

export const { addSubmission, clearNewFlags } = formSlice.actions;
export default formSlice.reducer;
