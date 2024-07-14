import React, { ChangeEvent, FormEvent } from 'react'
// import PropsType from './propsType'
import StateType from './types'
import PropsType from '../../Types/FunctionalPropsType'

export default class SearchForm extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = { SearchText: localStorage.getItem('SearchText') || '' }
        this.HandleChange = this.HandleChange.bind(this)
        this.HandleSubmit = this.HandleSubmit.bind(this)
    }

    HandleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ SearchText: event.target.value })
    }

    HandleSubmit(event: FormEvent) {
        event.preventDefault()
        const { SearchText } = this.state
        const { onSearchChange } = this.props
        localStorage.setItem('SearchText', SearchText)
        onSearchChange(SearchText)
    }

    render(): React.ReactNode {
        return (
            <>
                <form onSubmit={this.HandleSubmit}>
                    <input
                        value={this.state.SearchText}
                        onChange={this.HandleChange}
                    ></input>
                    <input type="submit"></input>
                </form>
            </>
        )
    }
}
