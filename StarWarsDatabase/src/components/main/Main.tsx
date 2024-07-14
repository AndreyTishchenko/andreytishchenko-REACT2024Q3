import { useEffect, useState } from 'react'
import getAPIresults from '../../API/api'
import Planets from './type'
import './main.css'

export default function Main({ SearchText }: { SearchText: string }) {
    const [Loading, ChangeLoading] = useState<boolean>(false)
    const [results, getResults] = useState<null | Array<Planets>>(null)

    async function getResult(): Promise<void> {
        const localSearch = localStorage.getItem('SearchText') || ''
        try {
            ChangeLoading(true)
            const response = await getAPIresults(localSearch, 10)
            getResults(response.results)
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
    if (results === null) {
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
                    {results.map((planet) => {
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
            </main>
        </>
    )
}
