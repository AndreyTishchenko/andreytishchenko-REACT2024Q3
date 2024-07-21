import { useState } from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'
import { useSearchParams } from 'react-router-dom'

export default function MainPage() {
    const [SearchText, changeText] = useState<string>(
        localStorage.getItem('SearchText') || ''
    )
    const [SearchParams, ChangeSearch] = useSearchParams()
    const queryParams = SearchParams.get('page') || '1'
    localStorage.setItem('CurrentPage', queryParams)
    function ChangeUrl(page: string) {
        ChangeSearch({ page: page })
    }
    function handleSearchChange(value: string) {
        changeText(value)
    }
    localStorage.removeItem('prevSearchText')
    return (
        <>
            <Header onSearchChange={handleSearchChange}></Header>
            <Main SearchText={SearchText} ChangeUrl={ChangeUrl}></Main>
            <Footer></Footer>
        </>
    )
}
