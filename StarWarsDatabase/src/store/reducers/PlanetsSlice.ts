import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Planet {
    id: string
    name: string
    diameter: string
    rotation_period: string
    orbital_period: string
    gravity: string
    population: string
    climate: string
    terrain: string
    surface_water: string
    residents: string[]
    films: string[]
    url: string
    created: string
    edited: string
}

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
