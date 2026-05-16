import { combineReducers, configureStore } from '@reduxjs/toolkit'
import PlanetReducer from './reducers/PlanetsSlice'
import { swapiApi } from './reducers/APiCalls'

const rootReducer = combineReducers({
    planetReducer: PlanetReducer,
})

export const setupStore = () =>
    configureStore({
        reducer: {
            planetReducer: PlanetReducer,
            [swapiApi.reducerPath]: swapiApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(swapiApi.middleware),
    })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = ReturnType<typeof setupStore>['dispatch']
