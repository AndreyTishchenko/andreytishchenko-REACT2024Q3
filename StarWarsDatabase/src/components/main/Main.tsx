import React from 'react'
import './main.css'
import './main.css'
import CardList from '../CardsList/CradsList'
import { Outlet, useLocation } from 'react-router'
const Main = React.memo(function ({
    SearchText,
}: {
    SearchText: string
}): React.ReactNode {
    const location = useLocation()
    const isDetailsPage = location.pathname === '/details'
    return (
        <>
            <main
                style={{
                    display: 'flex',
                    justifyContent: isDetailsPage ? 'space-between' : 'center',
                    width: '97.2%',
                }}
            >
                <CardList searchText={SearchText}></CardList>
                <Outlet />
            </main>
        </>
    )
})

export default Main
