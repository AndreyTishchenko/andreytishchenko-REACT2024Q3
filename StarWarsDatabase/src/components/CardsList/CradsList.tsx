import { useEffect, useState } from 'react'
import Result from '../../API/interface'
import { getPlanets } from '../../API/api'
import ErrorBoundary from '../error/error'
import Card from '../Card/Card'
import { useLocation, useSearchParams } from 'react-router-dom'

export default function CardList({ searchText }: { searchText: string }) {
    const [planetList, setPlanetList] = useState<Result | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [SearchParams, setSearchParams] = useSearchParams()
    const location = useLocation()

    const [pageNumber, changePage] = useState(SearchParams.get('page') || '1')

    const [CardId, setCardId] = useState(SearchParams.get('card') || '')
    useEffect(() => {
        // Получаем текущие параметры
        const currentParams = new URLSearchParams(SearchParams)

        // Создаем новые параметры на основе текущих
        const newParams = new URLSearchParams(SearchParams)
        newParams.set('page', pageNumber)
        if (CardId !== '' && String(location) === '/details') {
            newParams.set('card', CardId)
        }

        // Если параметры изменились, вызываем setSearchParams
        if (newParams.toString() !== currentParams.toString()) {
            setSearchParams(newParams)
        }

        const fetchData = async () => {
            setIsLoading(true)
            try {
                const results = await getPlanets(
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
    }, [
        searchText,
        pageNumber,
        CardId,
        setSearchParams,
        SearchParams,
        location,
    ])

    function nextPage() {
        if (planetList?.next !== null) {
            console.log(planetList?.next)
            changePage(String(Number(pageNumber) + 1))
            console.log(pageNumber)
            localStorage.removeItem('prevSearchText')
        }
    }

    function previousPage() {
        if (planetList?.previous !== null) {
            changePage(String(Number(pageNumber) - 1))
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
            <div className="CardList">
                <div className="grid-div">
                    {planetList.results.map((planet, index) => (
                        <Card
                            planet={planet}
                            key={index}
                            SetCardId={setCardId}
                        />
                    ))}
                </div>
                <div className="navigation">
                    <button onClick={previousPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div>
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
