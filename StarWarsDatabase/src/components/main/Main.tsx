import React from 'react'
import './main.css'
import './main.css'
import CardList from '../CardsList/CradsList'

// export default function Main(){

// }

const Main =  React.memo( function({ SearchText }: {SearchText: string}):React.ReactNode {
    console.log("newRender")
    return (
        <>
            <main>
                <CardList searchText = {SearchText}></CardList>
            </main>
        </>
    )
})

export default Main

