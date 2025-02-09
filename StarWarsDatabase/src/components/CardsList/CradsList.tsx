import { useEffect, useState } from 'react'
import Result from '../../API/interface'
import getAPIresults from '../../API/api'
import ErrorBoundary from '../error/error'
import Card from '../Card/Card'
import { useSearchParams } from 'react-router'

export default function CardList({ searchText }: { searchText: string }) {
    const [planetList, setPlanetList] = useState<Result | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [pageNumber, changePage] = useState(
        localStorage.getItem('CurrentPage') || '1'
    )
    const setSearchParams = useSearchParams()[1]

    useEffect(() => {
        setSearchParams({ page: pageNumber })
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const results = await getAPIresults(
                    searchText,
                    10,
                    JSON.parse(pageNumber)
                )
                setPlanetList(results)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [searchText, pageNumber, setSearchParams])

    function nextPage() {
        if (planetList?.next !== null) {
            console.log(planetList?.next)
            localStorage.setItem('CurrentPage', String(Number(pageNumber) + 1))
            changePage(localStorage.getItem('CurrentPage') || '2')
            console.log(pageNumber)
            localStorage.removeItem('prevSearchText')
        }
    }

    function previousPage() {
        if (planetList?.previous !== null) {
            localStorage.setItem('CurrentPage', String(Number(pageNumber) - 1))
            changePage(localStorage.getItem('CurrentPage') || '2')
            localStorage.removeItem('prevSearchText')
        }
    }

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
            <div className="navigation">
                <button onClick={previousPage}>Previous Page</button>
                <button onClick={nextPage}>Next Page</button>
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
