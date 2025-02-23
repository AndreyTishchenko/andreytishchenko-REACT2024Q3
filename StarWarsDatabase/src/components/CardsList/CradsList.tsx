import { useEffect, useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import ErrorBoundary from '../error/error'
import Card from '../Card/Card'
import FlyoutElement from '../FlyoutElement/FlyoutElement'
import { useAppSelector } from '../../hooks/redux'
import { useGetPlanetsQuery } from '../../store/reducers/APiCalls'

export default function CardList({ searchText }: { searchText: string }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const [pageNumber, changePage] = useState(searchParams.get('page') || '1')
    const [CardId, setCardId] = useState(searchParams.get('card') || '')
    const { planets } = useAppSelector((state) => state.planetReducer)

    // Use the RTK Query hook to fetch data
    const { data: planetList, isLoading } = useGetPlanetsQuery({
        search: searchText,
        page: Number(pageNumber),
        perPage: 10,
    })

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams)
        newParams.set('page', pageNumber)
        if (CardId && location.pathname === '/details') {
            newParams.set('card', CardId)
        }
        if (newParams.toString() !== searchParams.toString()) {
            setSearchParams(newParams)
        }
    }, [pageNumber, CardId, location, searchParams, setSearchParams])

    // Call updateSearchParams when page or card id changes

    function nextPage() {
        if (planetList?.next) {
            changePage(String(Number(pageNumber) + 1))
            localStorage.removeItem('prevSearchText')
        }
    }

    function previousPage() {
        if (planetList?.previous) {
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
            {planets.length > 0 && <FlyoutElement />}
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
