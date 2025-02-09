import { ChangeEvent, FormEvent, useState } from 'react'
import PropsType from '../../Types/FunctionalPropsType'
import './searchForm.css'

export default function SearchForm(props: PropsType){
    let [searchText, ChangeSearchText] = useState(localStorage.getItem('SearchText') || '')
    
    function HandleChange(event: ChangeEvent<HTMLInputElement>) {
        ChangeSearchText(event.target.value);
    }

    function HandleSubmit(event: FormEvent) {
        event.preventDefault()
        const SearchText = searchText
        console.log(props.onSearchChange);
        const { onSearchChange } = props;
        localStorage.setItem('SearchText', SearchText);
        onSearchChange(SearchText);
    }

    return (
        <>
            <form onSubmit={HandleSubmit}>
                <input
                    value={searchText}
                    onChange={HandleChange}
                    className="SearchInput"
                ></input>
                <input
                    type="submit"
                    className="SubmitInput"
                    value={''}
                ></input>
            </form>
        </>
    )
}