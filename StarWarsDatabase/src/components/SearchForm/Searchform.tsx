import { ChangeEvent, FormEvent, useState, useEffect, useContext } from 'react'
import PropsType from '../../Types/FunctionalPropsType'
import './searchForm.css'
import { MyContext } from '../myContext/myContext'

export default function SearchForm(props: PropsType) {
    const [searchText, setSearchText] = useState('')

    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Error')
    }
    const { value } = context

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
                className={'SearchInput' + (value ? ' light' : '')}
            />
            <button
                type="submit"
                className={'SubmitInput' + (value ? ' light' : '')}
            ></button>
        </form>
    )
}
