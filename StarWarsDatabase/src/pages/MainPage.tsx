import { useState } from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'

export default function MainPage() {
    const [SearchText, ChangeSearchText] = useState(
        localStorage.getItem('SearchText') || ''
    )
    function handleSearchChange(value: string) {
        ChangeSearchText(value)
    }

    return (
        <>
            <Header onSearchChange={handleSearchChange}></Header>
            <Main SearchText={SearchText}></Main>
            <Footer></Footer>
        </>
    )
}
