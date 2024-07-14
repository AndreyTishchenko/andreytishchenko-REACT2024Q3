import React from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'

export default class MainPage extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
            </>
        )
    }
}
