import './index.css'
import ErrorBoundary from './components/error/error'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import { browserRouter } from './routerprovider'
function App() {
    return (
        <>
            <ErrorBoundary>
                <RouterProvider
                    router={browserRouter}
                    future={{
                        v7_startTransition: true,
                    }}
                />
            </ErrorBoundary>
        </>
    )
}
export default App
