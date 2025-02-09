import './index.css'
import MainPage from './pages/MainPage'
import ErrorBoundary from './components/error/error'
import React from 'react'
function App():React.ReactNode{
    return (
        <>
            <ErrorBoundary>
                <MainPage></MainPage>
            </ErrorBoundary>
        </>
    )
}
export default App
