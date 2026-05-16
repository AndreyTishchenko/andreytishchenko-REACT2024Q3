import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Entry } from '../../types'
import { v4 as uuidv4 } from 'uuid'

export type AddEntryPayload = Omit<Entry, 'id' | 'createdAt'>

export interface EntriesState {
  items: Entry[]
  recentlyAddedId: string | null
}

const initialState: EntriesState = {
  items: [],
  recentlyAddedId: null
}

const entriesSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<AddEntryPayload>) => {
      const id = uuidv4()
      const createdAt = Date.now()
      state.items.unshift({ ...action.payload, id, createdAt })
      state.recentlyAddedId = id
    },
    clearRecent: (state) => {
      state.recentlyAddedId = null
    }
  }
})

export const { addEntry, clearRecent } = entriesSlice.actions
export default entriesSlice.reducer

export const selectEntries = (state: { entries: EntriesState }) => state.entries.items
export const selectRecentlyAddedId = (state: { entries: EntriesState }) => state.entries.recentlyAddedId
