import React from 'react'
import './main.css'
import './main.css'
import CardList from '../CardsList/CradsList'
import { Outlet } from 'react-router'
const Main = React.memo(function ({
    SearchText,
}: {
    SearchText: string
}): React.ReactNode {
    console.log('newRender')
    return (
        <>
            <main>
                <CardList searchText={SearchText}></CardList>
                <Outlet />
            </main>
        </>
    )
})

export default Main
