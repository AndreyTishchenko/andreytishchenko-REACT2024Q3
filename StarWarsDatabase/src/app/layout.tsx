'use client'
import '../globals.css'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import useSearchQuery from '../hooks/myCustomHook'
import Main from '../components/main/Main'
import { Provider } from 'react-redux'
import ErrorBoundary from '../components/error/error'
import { MyProvider } from '../components/myContext/myContext'
import { setupStore } from '../store/store'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [SearchText, ChangeSearchText] = useSearchQuery('SearchText', '')
    const store = setupStore()
    function handleSearchChange(value: string) {
        ChangeSearchText(value)
    }

    return (
        <Provider store={store}>
            <ErrorBoundary>
                <MyProvider>
                    <html lang="ru">
                        <body>
                            <Header onSearchChange={handleSearchChange} />
                            <Main SearchText={SearchText}>{children}</Main>
                            <Footer />
                        </body>
                    </html>
                </MyProvider>
            </ErrorBoundary>
        </Provider>
    )
}
