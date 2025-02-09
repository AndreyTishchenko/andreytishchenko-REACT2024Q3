
import { useState } from 'react';
import SearchForm from '../SearchForm/Searchform';
import PropsType from '../../Types/FunctionalPropsType'
import './header.css';

export default function Header(props: PropsType) {
    const [isError, setError] = useState(false);

    function Crash() {
        setError(true);
    }

    if (isError) {
        throw new Error('Throw error by button');
    }

    return (
        <header>
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
            <SearchForm onSearchChange={props.onSearchChange} />
        </header>
    );
}
