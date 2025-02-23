import { combineReducers, configureStore } from '@reduxjs/toolkit'
import PlanetReducer from './reducers/PlanetsSlice'

const rootReducer = combineReducers({
    planetReducer: PlanetReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
