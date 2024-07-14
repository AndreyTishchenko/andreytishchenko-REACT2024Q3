import React from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'

export default class MainPage extends React.Component {
    constructor(prop: object) {
        super(prop)
        this.state = {
            SearchText: localStorage.getItem('SearchText') || '',
        }
        console.log(this.state)
    }

    handleSearchChange(SearchText: string) {
        console.log(SearchText)
    }
    render(): React.ReactNode {
        return (
            <>
                <Header onSearchChange={this.handleSearchChange}></Header>
                <Main></Main>
                <Footer></Footer>
            </>
        )
    }
}
