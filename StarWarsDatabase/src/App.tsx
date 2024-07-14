import './App.css'
import React, { FormEvent } from 'react'
import MainPage from './pages/MainPage'
class App extends React.Component<Object, { loading?: boolean }> {
    render() {
        return (
            <>
                <MainPage></MainPage>
            </>
        )
    }
}

export default App
