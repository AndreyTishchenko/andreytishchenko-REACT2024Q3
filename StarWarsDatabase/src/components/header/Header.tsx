import React from 'react'
import SearchForm from '../SearchForm/Searchform'
import PropsType from '../../Types/FunctionalPropsType'

export default class Header extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props)
    }

    render(): React.ReactNode {
        const onSearchChange = this.props.onSearchChange
        return (
            <>
                <div></div>
                <div></div>
                <SearchForm onSearchChange={onSearchChange}></SearchForm>
            </>
        )
    }
}
