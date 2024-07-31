import { useState } from 'react'
import Header from '../components/header/Header'
import MainDiv from '../components/main/Main'
import Footer from '../components/footer/Footer'
import { useSearchParams } from 'react-router-dom'

export default function MainPage() {
    localStorage.removeItem('chosenItemId');
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
        ChangeUrl('1');
    }
    localStorage.removeItem('prevSearchText')
    return (
        <>
            <div role='mainPage'>
                <Header onSearchChange={handleSearchChange}></Header>
                <MainDiv SearchText={SearchText} ChangeUrl={ChangeUrl}></MainDiv>
                <Footer></Footer>
            </div>
        </>
    )
}
