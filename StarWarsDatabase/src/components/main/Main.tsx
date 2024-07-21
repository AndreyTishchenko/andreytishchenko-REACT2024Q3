import { useEffect, useState } from 'react'
import getAPIresults from '../../API/api'
import IResults from '../../Types/ApiResultsType'
import './main.css'
import Pagination from '../pagination/Pagination'
import IPropsType from './type'

export default function Main(props: IPropsType) {
    const [Loading, ChangeLoading] = useState<boolean>(false)
    const [APIresults, getResults] = useState<null | IResults>(null)
    const [RerenderElement, ChnageRerenderElement] = useState(1)
    async function GetResult(): Promise<void> {
        const localSearch = localStorage.getItem('SearchText') || ''
        try {
            ChangeLoading(true)
            const response = await getAPIresults(
                localSearch,
                10,
                Number(localStorage.getItem('CurrentPage'))
            )
            getResults(response)
        } catch (error) {
            console.error(
                `Error fetching data: on the page${localStorage.getItem('CurrentPage')}`,
                error
            )
        } finally {
            ChangeLoading(false)
        }
    }

    function Rerender() {
        ChnageRerenderElement(RerenderElement + 1)
    }

    useEffect(() => {
        if (props.SearchText !== localStorage.getItem('prevSearchText')) {
            localStorage.setItem('prevSearchText', props.SearchText)
            GetResult()
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
    if (APIresults === null) {
        return (
            <>
                <h1>Something went wrong!</h1>
            </>
        )
    }

    if (Number(localStorage.getItem('CurrentPage')) == 1) {
        return (
            <>
                <main>
                    <div className="grid-div">
                        {APIresults.results.map((planet, index) => {
                            return (
                                <div
                                    key={String(index + 1)}
                                    className={String(index + 1)}
                                >
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
                                        population:{' '}
                                        <span>{planet.population}</span>
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
                    <Pagination
                        APIresults={APIresults}
                        Rerender={Rerender}
                        ChangeUrl={props.ChangeUrl}
                    ></Pagination>
                </main>
            </>
        )
    }
    return (
        <>
            <main>
                <div className="grid-div">
                    {APIresults.results.map((planet, index) => {
                        return (
                            <div
                                key={String(
                                    index +
                                        1 +
                                        Number(
                                            localStorage.getItem('CurrentPage')
                                        ) *
                                            10
                                )}
                                className={String(
                                    index +
                                        1 +
                                        Number(
                                            localStorage.getItem('CurrentPage')
                                        ) *
                                            10
                                )}
                            >
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
                <Pagination
                    APIresults={APIresults}
                    Rerender={Rerender}
                    ChangeUrl={props.ChangeUrl}
                ></Pagination>
            </main>
        </>
    )
}
