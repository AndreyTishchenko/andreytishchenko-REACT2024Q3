import { useContext, useState } from 'react'
import SearchForm from '../SearchForm/Searchform'
import PropsType from '../../Types/FunctionalPropsType'
import './header.css'
import { MyContext } from '../myContext/myContext'

export default function Header(props: PropsType) {
    const [isError, setError] = useState(false)
    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Error')
    }

    const { value, updateValue } = context

    function Crash() {
        setError(true)
    }

    if (isError) {
        throw new Error('Throw error by button')
    }

    return (
        <header className={value ? 'Light' : ''}>
            <div>
                <button onClick={Crash}>Crash System</button>
            </div>
            <div>
                <img
                    src="https://fullhdoboi.ru/wp-content/uploads/_ph/4/343729462.jpg"
                    alt="starWarsLogo"
                    className="StarWarsLogo"
                />
            </div>

            <button onClick={() => updateValue(!value)}>
                {value ? 'Jedi' : 'Sith'}
            </button>

            <SearchForm onSearchChange={props.onSearchChange} />
        </header>
    )
}
