import './index.css'
import MainPage from './pages/MainPage'
import ErrorBoundary from './components/error/error'
import React from 'react'
import { Route, Routes } from 'react-router'
import NotFound from './pages/NotFound'
import DetailsComponent from './components/DetailsComponent/DetailsComponent'
function App(): React.ReactNode {
    return (
        <>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<MainPage />}>
                        <Route
                            path="/details"
                            element={<DetailsComponent />}
                        ></Route>
                    </Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </ErrorBoundary>
        </>
    )
}
export default App
