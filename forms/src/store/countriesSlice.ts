import { createSlice } from "@reduxjs/toolkit";

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: ["USA", "Canada", "UK", "Germany", "France"],
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // Optional: reducer to update countries list if needed
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
