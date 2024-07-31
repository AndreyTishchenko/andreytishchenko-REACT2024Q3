export default async function getAPIresults(
    searchValue: string,
    pageNumber: number
) {
    const response = await fetch(
        `https://swapi.dev/api/planets/?search=${searchValue}&limit=10&page=${pageNumber}`
    )
    if (!(response.ok)) {
        throw Error

    }
    const json = await response.json()
    return json
}
