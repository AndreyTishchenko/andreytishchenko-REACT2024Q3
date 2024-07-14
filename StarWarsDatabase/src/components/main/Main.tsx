import { useEffect, useState } from 'react'
import getAPIresults from '../../API/api'
import IResults from './type'
import './main.css'

export default function Main({ SearchText }: { SearchText: string }) {
    const [Loading, ChangeLoading] = useState<boolean>(false)
    const [APIresults, getResults] = useState<null | IResults>(null)
    const [pageNumber, changePage] = useState(
        localStorage.getItem('CurrentPage') || '1'
    )

    async function getResult(): Promise<void> {
        const localSearch = localStorage.getItem('SearchText') || ''
        try {
            ChangeLoading(true)
            const response = await getAPIresults(
                localSearch,
                10,
                Number(pageNumber)
            )
            getResults(response)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            ChangeLoading(false)
        }
    }

    useEffect(() => {
        if (SearchText !== localStorage.getItem('prevSearchText')) {
            localStorage.setItem('prevSearchText', SearchText)
            getResult()
        }
    })

    function nextPage() {
        if (APIresults?.next !== null) {
            console.log(APIresults?.next)
            localStorage.setItem('CurrentPage', String(Number(pageNumber) + 1))
            changePage(localStorage.getItem('CurrentPage') || '2')
            console.log(pageNumber)
            localStorage.removeItem('prevSearchText')
        }
    }

    function previousPage() {
        if (APIresults?.previous !== null) {
            localStorage.setItem('CurrentPage', String(Number(pageNumber) - 1))
            changePage(localStorage.getItem('CurrentPage') || '2')
            localStorage.removeItem('prevSearchText')
        }
    }
    if (Loading === true) {
        return (
            <>
                <main>
                    <div>
                        <h1>Loading</h1>
                    </div>
                </main>
            </>
        )
    }
    if (APIresults === null) {
        return (
            <>
                <h1>Something went wrong!</h1>
            </>
        )
    }
    return (
        <>
            <main>
                <div className="grid-div">
                    {APIresults.results.map((planet) => {
                        return (
                            <div key={planet.created} className="card">
                                <h3>{planet.name}</h3>
                                <p>
                                    diameter: <span>{planet.diameter}</span>
                                </p>
                                <p>
                                    rotation_period:{' '}
                                    <span>{planet.rotation_period}</span>
                                </p>
                                <p>
                                    orbital_period:{' '}
                                    <span>{planet.orbital_period}</span>
                                </p>
                                <p>
                                    gravity: <span>{planet.gravity}</span>
                                </p>
                                <p>
                                    population: <span>{planet.population}</span>
                                </p>
                                <p>
                                    climate: <span>{planet.climate}</span>
                                </p>
                                <p>
                                    terrain: <span>{planet.terrain}</span>
                                </p>
                                <p>
                                    surface_water:{' '}
                                    <span>{planet.surface_water}</span>
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div className="navigation">
                    <button onClick={previousPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div>
            </main>
        </>
    )
}
