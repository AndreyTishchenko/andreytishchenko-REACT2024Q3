import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Planet } from '../../Types/PlanetType'

export interface PlanetsState {
    planets: Planet[]
}

const initialState: PlanetsState = {
    planets: [],
}

export const planetsSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {
        addPlanet: (state, action: PayloadAction<Planet>) => {
            state.planets.push(action.payload)
        },

        deletePlanet: (state, action: PayloadAction<string>) => {
            state.planets = state.planets.filter(
                (planet) => planet.id !== action.payload
            )
        },

        getPlanets: (state) => {
            return state
        },
    },
})

export default planetsSlice.reducer
