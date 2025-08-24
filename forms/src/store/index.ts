import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from './slices/countriesSlice'
import entriesReducer from './slices/entriesSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    entries: entriesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
