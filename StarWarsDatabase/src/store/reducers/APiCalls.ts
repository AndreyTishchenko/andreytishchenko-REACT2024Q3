import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Result from '../../API/interface'
import { Planet } from '../../components/main/type'

export const swapiApi = createApi({
    reducerPath: 'swapiApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    endpoints: (builder) => ({
        getPlanets: builder.query<
            Result,
            { search: string; page: number; perPage: number }
        >({
            query: ({ search, page, perPage }) =>
                `planets/?search=${search}&page=${page}&limit=${perPage}`,
        }),
        getPlanet: builder.query<Planet, string>({
            query: (id) => `planets/${id}`,
        }),
    }),
})

export const { useGetPlanetsQuery, useGetPlanetQuery } = swapiApi
