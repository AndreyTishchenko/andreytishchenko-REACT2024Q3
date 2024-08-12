import { useCallback, useEffect, useState } from 'react'
import getAPIresults from '../../API/api'
import IResults from '../../Types/ApiResultsType'
import './main.css'
import Pagination from '../pagination/Pagination'
import IPropsType from './type'
import CardsList from '../CardsList/CardsList'

export default function MainDiv(props: IPropsType) {
    const [Loading, ChangeLoading] = useState<boolean>(false)
    const [APIresults, getResults] = useState<null | IResults>(null)
    const GetResult = useCallback(
        async function GetResult(): Promise<void> {
            try {
                ChangeLoading(true)
                const response = await getAPIresults(
                    props.SearchText,
                    Number(localStorage.getItem('CurrentPage'))
                )
                getResults(response)
            } catch (error) {
                console.error(
                    `Error fetching data: on the page${localStorage.getItem('CurrentPage')}`,
                    error
                )
            } finally {
                ChangeLoading(false)
            }
        },
        [props.SearchText]
    )

    useEffect(() => {
        if (props.SearchText !== localStorage.getItem('prevSearchText')) {
            localStorage.setItem('prevSearchText', props.SearchText)
            GetResult()
        }
    }, [props.queryParams, props.SearchText, GetResult])

    if (Loading === true) {
        return (
            <>
                <div role="MainDiv">
                    <div>
                        <h1>Loading</h1>
                    </div>
                </div>
            </>
        )
    } else if (APIresults === null) {
        return (
            <>
                <div role="MainDiv">
                    <div>
                        <h1>Something went wrong!</h1>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div role="MainDiv">
                <CardsList ApiResults={APIresults}></CardsList>
                <Pagination
                    APIresults={APIresults}
                    ChangeUrl={props.ChangeUrl}
                ></Pagination>
            </div>
        </>
    )
}
