import { createSlice } from '@reduxjs/toolkit'
import { countries } from '../../data/countries'

export interface CountriesState {
  list: string[]
}

const initialState: CountriesState = {
  list: [...countries]
}

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {}
})

export default countriesSlice.reducer
