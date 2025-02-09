import { useEffect, useState } from 'react'
import Result from '../../API/interface'
import getAPIresults from '../../API/api'
import ErrorBoundary from '../error/error'
import Card from '../Card/Card'

export default function CardList({ searchText }: { searchText: string }) {
    const [planetList, setPlanetList] = useState<Result | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const results = await getAPIresults(searchText, 10) // Assuming getAPIresults returns a Promise
                setPlanetList(results)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [searchText])

    if (isLoading) {
        return <Loading />
    }

    if (!planetList || !planetList.results.length) {
        return <div>No planets found.</div>
    }

    return (
        <ErrorBoundary>
            <div className="grid-div">
                {planetList.results.map((planet, index) => (
                    <Card planet={planet} key={index} />
                ))}
            </div>
        </ErrorBoundary>
    )
}

function Loading() {
    return (
        <div>
            <h2>Loading...</h2>
        </div>
    )
}
