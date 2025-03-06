'use client'

import React, { ReactNode } from 'react'
import CardList from '../CardsList/CradsList'
import { usePathname } from 'next/navigation'

interface MainProps {
    SearchText: string
    children?: ReactNode
}

const Main = React.memo(function Main({
    SearchText,
    children,
}: MainProps): JSX.Element {
    const pathname = usePathname()
    const isDetailsPage = pathname === '/details'

    return (
        <main
            style={{
                display: 'flex',
                justifyContent: isDetailsPage ? 'space-between' : 'center',
                width: '97.2%',
            }}
        >
            <CardList searchText={SearchText} />
            {children}
        </main>
    )
})

export default Main
