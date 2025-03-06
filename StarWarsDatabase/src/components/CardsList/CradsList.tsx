'use client'

import { useContext, useEffect, useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import ErrorBoundary from '../error/error'
import Card from '../Card/Card'
import FlyoutElement from '../FlyoutElement/FlyoutElement'
import { useAppSelector } from '../../hooks/redux'
import { useGetPlanetsQuery } from '../../store/reducers/APiCalls'
import { MyContext } from '../myContext/myContext'
import Pagination from '../Pagination/Pagination'

export default function CardList({ searchText }: { searchText: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const initialPage = searchParams.get('page') || '1'

    const [pageNumber, changePage] = useState(initialPage)

    const { planets } = useAppSelector((state) => state.planetReducer)

    const { data: planetList, isLoading } = useGetPlanetsQuery({
        search: searchText,
        page: Number(pageNumber),
        perPage: 10,
    })

    useEffect(() => {
        const currentSearch = new URLSearchParams(window.location.search)
        const params = new URLSearchParams(currentSearch.toString())
        params.set('page', pageNumber)
        const newQueryString = params.toString()
        if (currentSearch.toString() !== newQueryString) {
            router.push(`${pathname}?${newQueryString}`)
        }
    }, [pageNumber, pathname, router])

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
                        <Card planet={planet} key={index} />
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
            <h2 style={{ color: value ? 'rgb(0, 183, 255)' : undefined }}>
                Loading...
            </h2>
        </div>
    )
}
