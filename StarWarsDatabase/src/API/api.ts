import Result from './interface'
import { Planet } from '../components/main/type'
export async function getPlanets(
    searchValue: string,
    perPage: number,
    pageNumber: number
): Promise<Result | null> {
    const response = await fetch(
        `https://www.swapi.tech/api/planets/?search=${searchValue}&limit=${perPage}&page=${pageNumber}`
    )
    if (response.ok) {
        const json = await response.json()
        console.log(json)
        return json
    } else {
        return null
    }
}

export async function getPlanet(id: string): Promise<Planet | null> {
    const response = await fetch(`https://swapi.dev/api/planets/${id}`)
    if (response.ok) {
        const json = await response.json()
        return json
    } else {
        return null
    }
}
