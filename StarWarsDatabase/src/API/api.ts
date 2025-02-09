import Result from './interface'
export default async function getAPIresults(
    searchValue: string,
    perPage: number
): Promise<Result | null> {
    const response = await fetch(
        `https://swapi.dev/api/planets/?search=${searchValue}&limit=${perPage}&page=1`
    )
    if (response.ok) {
        const json = await response.json()
        console.log(json)
        return json
    } else {
        return null
    }
}
