import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import MainDiv from '../components/main/Main'
import Footer from '../components/footer/Footer'
import { useSearchParams } from 'react-router-dom'

export default function DetailsPage() {
    console.log(localStorage.getItem('CurrentPage'))
    const [SearchText, changeText] = useState<string>(
        localStorage.getItem('SearchText') || ''
    )
    const [PageState, setPageState] = useState<string>(
        localStorage.getItem('CurrentPage') || '1'
    )
    const [PageParams, SetPage] = useSearchParams()

    useEffect(() => {
        if (PageParams.get('page') !== PageState) {
            SetPage({ page: PageState })
        }
    }, [PageState, SearchText, PageParams, SetPage])

    const queryParams = PageParams.get('page') || '1'
    localStorage.setItem('CurrentPage', queryParams)

    function ChangePage(page: string) {
        setPageState(page)
    }

    function handleSearchChange(value: string) {
        changeText(value)
        setPageState('1')
    }

    localStorage.removeItem('prevSearchText')

    return (
        <>
            <div role="mainPage">
                <Header onSearchChange={handleSearchChange}></Header>
                <main>
                    <MainDiv
                        SearchText={SearchText}
                        ChangeUrl={ChangePage}
                        queryParams={queryParams}
                    ></MainDiv>
                </main>
                <Footer></Footer>
            </div>
        </>
    )
}
