import React from 'react'
import getAPIresults from '../../API/api'
import StateType from './type'

export default class Main extends React.Component<
    { SearchText: string },
    StateType
> {
    constructor(props: { SearchText: string }) {
        super(props)
        this.state = { Loading: false, results: null }
    }

    public async componentDidMount(): Promise<void> {
        const localSearch = localStorage.getItem('SearchText') || ''
        try {
            this.setState({ Loading: true })
            const response = await getAPIresults(localSearch, 10)
            this.setState({ results: response.results })
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            this.setState({ Loading: false })
        }
    }

    public async componentDidUpdate(prevProps: {
        SearchText: string
    }): Promise<void> {
        const { SearchText } = this.props
        if (prevProps.SearchText !== SearchText) {
            try {
                this.setState({ Loading: true })
                const response = await getAPIresults(SearchText, 10)
                this.setState({ results: response.results })
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                this.setState({ Loading: false })
            }
        }
    }
    render(): React.ReactNode {
        console.log(this.state.results)
        if (this.state.Loading === true) {
            return (
                <>
                    <div>
                        <h1>Loading</h1>
                    </div>
                </>
            )
        }
        if (this.state.results === null) {
            return (
                <>
                    <h1>Something went wrong!</h1>
                </>
            )
        }
        return (
            <>
                <div>
                    {this.state.results.map((planet) => {
                        return (
                            <div key={planet.created}>
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
            </>
        )
    }
}
