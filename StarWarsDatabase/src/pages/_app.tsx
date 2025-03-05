import '../globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { setupStore } from '../store/store'
import { MyProvider } from '../components/myContext/myContext'
import ErrorBoundary from '../components/error/error'

const store = setupStore()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <ErrorBoundary>
                <MyProvider>
                    <Component {...pageProps} />
                </MyProvider>
            </ErrorBoundary>
        </Provider>
    )
}

export default MyApp
