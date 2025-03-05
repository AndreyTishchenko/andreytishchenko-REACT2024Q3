// src/components/Main/Main.tsx
import React, { ReactNode } from 'react'
import CardList from '../CardsList/CradsList'
import { useRouter } from 'next/router'

interface MainProps {
    SearchText: string
    children?: ReactNode
}

const Main = React.memo(function Main({ SearchText, children }: MainProps) {
    const router = useRouter()
    const isDetailsPage = router.pathname === '/details'

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
