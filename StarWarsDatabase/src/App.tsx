import './index.css'
import MainPage from './pages/MainPage'
import ErrorBoundary from './components/error/error'

function App() {
    return (
        <>
            <ErrorBoundary>
                <MainPage></MainPage>
            </ErrorBoundary>
        </>
    )
}
export default App
