import './index.css'
import MainPage from './pages/MainPage'
import ErrorBoundary from './components/error/error'
import React from 'react'
import { Route, Routes } from 'react-router'
import NotFound from './pages/NotFound'
import DetailsComponent from './components/DetailsComponent/DetailsComponent'
import { Provider } from 'react-redux'
import { setupStore } from './store/store'
import { MyProvider } from './components/myContext/myContext'

const store = setupStore()
function App(): React.ReactNode {
    return (
        <>
            <Provider store={store}>
                <ErrorBoundary>
                    <MyProvider>
                        <Routes>
                            <Route path="/" element={<MainPage />}>
                                <Route
                                    path="/details"
                                    element={<DetailsComponent />}
                                ></Route>
                            </Route>
                            <Route path="*" element={<NotFound />}></Route>
                        </Routes>
                    </MyProvider>
                </ErrorBoundary>
            </Provider>
        </>
    )
}
export default App
