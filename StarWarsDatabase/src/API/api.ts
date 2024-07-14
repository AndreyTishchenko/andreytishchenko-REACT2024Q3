export default async function name(searchValue: string, perPage: number) {
    const response = await fetch(
        `https://swapi.dev/api/planets/?search=${searchValue}&limit=${perPage}&page=1`
    )
    if (response.ok) {
        const json = await response.json()
        return json
    }
    return 'something went wrong'
}
