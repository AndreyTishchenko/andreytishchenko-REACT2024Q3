import { useState } from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'

export default function MainPage() {
    const [SearchText, changeText] = useState<string>(
        localStorage.getItem('SearchText') || ''
    )
    function handleSearchChange(value: string) {
        changeText(value)
    }
    localStorage.removeItem('prevSearchText')
    return (
        <>
            <Header onSearchChange={handleSearchChange}></Header>
            <Main SearchText={SearchText}></Main>
            <Footer></Footer>
        </>
    )
}
