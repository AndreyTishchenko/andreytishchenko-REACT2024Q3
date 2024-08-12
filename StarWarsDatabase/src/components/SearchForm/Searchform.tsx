import { ChangeEvent, FormEvent, useState } from 'react'
import PropsType from '../../Types/FunctionalPropsType'
import './searchForm.css'
import useCustomHook from '../customHook'

export default function SearchForm({ onSearchChange }: PropsType) {
    const [SearchText, SetSearchtext] = useState(
        localStorage.getItem('SearchText') || ''
    )

    function HandleChange(event: ChangeEvent<HTMLInputElement>) {
        SetSearchtext(event.target.value as string)
    }

    function HandleSubmit(event: FormEvent) {
        event.preventDefault()
        const SearchChange = onSearchChange
        localStorage.setItem('SearchText', SearchText)
        localStorage.setItem('CurrentPage', '1')
        SearchChange(SearchText)
    }

    useCustomHook(SearchText)

    return (
        <>
            <form onSubmit={HandleSubmit}>
                <input
                    value={SearchText}
                    onChange={HandleChange}
                    className="SearchInput"
                ></input>
                <input type="submit" className="SubmitInput" value={''}></input>
            </form>
        </>
    )
}
