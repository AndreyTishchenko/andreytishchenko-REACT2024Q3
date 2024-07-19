import './index.css'
import MainPage from './pages/MainPage'
import ErrorBoundary from './components/error/error'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './pages/errorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage></MainPage>,
        errorElement: <ErrorPage />,
    },
])
function App() {
    return (
        <>
            <ErrorBoundary>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </>
    )
}
export default App
