import entriesReducer, {
  addEntry,
  clearRecent,
  type EntriesState,
  type AddEntryPayload
} from '../store/slices/entriesSlice'

test('addEntry adds item and sets recent id', () => {
  const initial: EntriesState = { items: [], recentlyAddedId: null }
  const payload: AddEntryPayload = {
    name: 'Alice',
    age: 25,
    email: 'a@a.com',
    password: 'Aa1!aaaa',
    gender: 'female',
    acceptTnC: true,
    country: 'Germany',
    imageBase64: null,
    source: 'react-hook-form'
  }
  const state = entriesReducer(initial, addEntry(payload))
  expect(state.items.length).toBe(1)
  expect(state.recentlyAddedId).toBeTruthy()
})
