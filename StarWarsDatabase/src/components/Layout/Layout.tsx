import Header from '../header/Header'
import Footer from '../footer/Footer'
import useSearchQuery from '../../hooks/myCustomHook'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const ChangeSearchText = useSearchQuery('SearchText', '')[1]

    function handleSearchChange(value: string) {
        ChangeSearchText(value)
    }
    return (
        <>
            <Header onSearchChange={handleSearchChange} />
            {children}
            <Footer />
        </>
    )
}
