import React from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/Main'
import Footer from '../components/footer/Footer'

export default class MainPage extends React.Component<
    object,
    { SearchText: string }
> {
    constructor(prop: object) {
        super(prop)
        this.state = {
            SearchText: localStorage.getItem('SearchText') || '',
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        console.log(this.state)
    }

    handleSearchChange(value: string) {
        this.setState({ SearchText: value })
    }
    render(): React.ReactNode {
        return (
            <>
                <Header onSearchChange={this.handleSearchChange}></Header>
                <Main SearchText={this.state.SearchText}></Main>
                <Footer></Footer>
            </>
        )
    }
}
