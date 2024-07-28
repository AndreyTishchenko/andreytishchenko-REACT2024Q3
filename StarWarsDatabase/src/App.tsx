import './index.css'
import MainPage from './pages/MainPage'
import ErrorBoundary from './components/error/error'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import ErrorPage from './pages/errorPage'
function App() {
    return (
        <>
            <ErrorBoundary>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />}></Route>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        </>
    )
}
export default App
