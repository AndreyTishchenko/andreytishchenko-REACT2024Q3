import { ChangeEvent, FormEvent, useState, useEffect, useContext } from 'react'
import SearchChangeProps from '../../Types/SearchChangeProps'
import styles from './searchForm.module.css'
import { MyContext } from '../myContext/myContext'

export default function SearchForm(props: SearchChangeProps) {
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
        localStorage.setItem('SearchText', JSON.stringify(searchText))
        if (onSearchChange) {
            onSearchChange(searchText)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                value={searchText}
                onChange={handleChange}
                className={`${styles.SearchInput} ${value ? styles.light : ''}`}
            />
            <button
                type="submit"
                className={`${styles.SubmitInput} ${value ? styles.light : ''}`}
            ></button>
        </form>
    )
}
