import React from 'react'
import SearchForm from '../SearchForm/Searchform'
import PropsType from '../../Types/FunctionalPropsType'
import './header.css'

export default class Header extends React.Component<
    PropsType,
    { isError: boolean }
> {
    constructor(props: PropsType) {
        super(props)
        this.state = { isError: false }
        this.Crash = this.Crash.bind(this)
    }

    Crash() {
        this.setState({ isError: true })
    }

    render(): React.ReactNode {
        if (this.state.isError) {
            throw new Error('Throw error by button')
        }
        const onSearchChange = this.props.onSearchChange
        return (
            <>
                <header>
                    <div>
                        <button onClick={this.Crash}>Crach System</button>
                    </div>
                    <div>
                        <img
                            src="https://fullhdoboi.ru/wp-content/uploads/_ph/4/343729462.jpg"
                            alt="starWarsLogo"
                            className="StarWarsLogo"
                        ></img>
                    </div>
                    <SearchForm onSearchChange={onSearchChange}></SearchForm>
                </header>
            </>
        )
    }
}
