import './index.css'
import React from 'react'
import MainPage from './pages/MainPage'
import ErrorBoundary from './components/error/error'
class App extends React.Component {
    render() {
        return (
            <>
                <ErrorBoundary>
                    <MainPage></MainPage>
                </ErrorBoundary>
            </>
        )
    }
}

export default App
