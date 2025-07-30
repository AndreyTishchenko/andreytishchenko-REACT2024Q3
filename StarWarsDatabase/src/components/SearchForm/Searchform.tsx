import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import PropsType from '../../Types/FunctionalPropsType'
import './searchForm.css'

export default function SearchForm(props: PropsType) {
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        const savedText = localStorage.getItem('SearchText')
        if (savedText) {
            setSearchText(savedText.replace(/^"(.*)"$/, '$1'))
        }
    }, [])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value)
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const { onSearchChange } = props
        localStorage.setItem('SearchText', searchText)
        if (onSearchChange) {
            onSearchChange(searchText)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={searchText}
                onChange={handleChange}
                className="SearchInput"
            />
            <button type="submit" className="SubmitInput">
                Search
            </button>
        </form>
    )
}
