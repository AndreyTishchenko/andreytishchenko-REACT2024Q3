import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import useSearchQuery from '../hooks/myCustomHook'

export default function SecondPage() {
    const [SearchText, ChangeSearchText] = useSearchQuery('SearchText', '')
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
