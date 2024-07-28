import { useState } from 'react'
import SearchForm from '../SearchForm/Searchform'
import PropsType from '../../Types/FunctionalPropsType'
import './header.css'

export default function Header({ onSearchChange }: PropsType) {
    const [isError, SetError] = useState(false)
    function Crash() {
        SetError(true)
    }
    if (isError) {
        throw new Error('Throw error by button')
    }
    return (
        <>
            <header role="header">
                <div>
                    <button onClick={Crash}>Crach System</button>
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
