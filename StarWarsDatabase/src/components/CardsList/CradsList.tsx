import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ErrorBoundary from '../error/error'
import Card from '../Card/Card'
import FlyoutElement from '../FlyoutElement/FlyoutElement'
import { useAppSelector } from '../../hooks/redux'
import { useGetPlanetsQuery } from '../../store/reducers/APiCalls'
import { MyContext } from '../myContext/myContext'
import Pagination from '../Pagination/Pagination'

export default function CardList({ searchText }: { searchText: string }) {
    const router = useRouter()

    const initialPage = router.query.page ? String(router.query.page) : '1'
    const initialCard = router.query.card ? String(router.query.card) : ''

    const [pageNumber, changePage] = useState(initialPage)
    const [cardId, setCardId] = useState(initialCard)

    const { planets } = useAppSelector((state) => state.planetReducer)

    const { data: planetList, isLoading } = useGetPlanetsQuery({
        search: searchText,
        page: Number(pageNumber),
        perPage: 10,
    })

    useEffect(() => {
        // Cast router.query to a flexible type so that we can add more properties
        const currentQuery = router.query as { [key: string]: string }
        const newQuery: { [key: string]: string } = {
            ...currentQuery,
            page: pageNumber,
        }

        if (cardId && router.pathname === '/details') {
            newQuery.card = cardId
        } else {
            delete newQuery.card
        }

        router.push({ pathname: router.pathname, query: newQuery }, undefined, {
            shallow: true,
        })
    }, [pageNumber, cardId, router])

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
                <Pagination
                    planetList={planetList}
                    changePage={changePage}
                    pageNumber={pageNumber}
                />
            </div>
            {planets.length > 0 && <FlyoutElement />}
        </ErrorBoundary>
    )
}

function Loading() {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Error')
    }
    const { value } = context

    return (
        <div>
            <h2 style={{ color: value ? 'rgb(0, 183, 255)' : '' }}>
                Loading...
            </h2>
        </div>
    )
}
