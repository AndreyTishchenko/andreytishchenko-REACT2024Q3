import { useContext, useState } from 'react'
import SearchForm from '../SearchForm/Searchform'
import SearchChangeProps from '../../Types/SearchChangeProps'
import { MyContext } from '../myContext/myContext'
import styles from './header.module.css'

export default function Header(props: SearchChangeProps) {
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
        <header className={`${styles.header} ${value ? styles.Light : ''}`}>
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
