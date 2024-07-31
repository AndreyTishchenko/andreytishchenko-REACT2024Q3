import { useEffect, useState } from 'react'
import getAPIresults from '../../API/api'
import IResults from '../../Types/ApiResultsType'
import './main.css'
import Pagination from '../pagination/Pagination'
import IPropsType from './type'
import CardsList from '../CardsList/CardsList'

export default function Main(props: IPropsType) {
    const [Loading, ChangeLoading] = useState<boolean>(false)
    const [APIresults, getResults] = useState<null | IResults>(null)
    const [RerenderElement, ChnageRerenderElement] = useState(1)
    async function GetResult(): Promise<void> {
        const localSearch = localStorage.getItem('SearchText') || ''
        try {
            ChangeLoading(true)
            const response = await getAPIresults(
                localSearch,
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
    }

    function Rerender() {
        ChnageRerenderElement(RerenderElement + 1)
    }

    useEffect(() => {
        if (props.SearchText !== localStorage.getItem('prevSearchText')) {
            localStorage.setItem('prevSearchText', props.SearchText)
            GetResult()
        }
    })
    if (Loading === true) {
        return (
            <>
                <main role="main">
                    <div>
                        <h1>Loading</h1>
                    </div>
                </main>
            </>
        )
    }
    if (APIresults === null) {
        return (
            <>
                <h1>Something went wrong!</h1>
            </>
        )
    }

    if (Number(localStorage.getItem('CurrentPage')) == 1) {
        return (
            <>
                <main role="main">
                    <CardsList ApiResults={APIresults}></CardsList>
                    <Pagination
                        APIresults={APIresults}
                        Rerender={Rerender}
                        ChangeUrl={props.ChangeUrl}
                    ></Pagination>
                </main>
            </>
        )
    }
    return (
        <>
            <main role="main">
                <CardsList ApiResults={APIresults}></CardsList>
                <Pagination
                    APIresults={APIresults}
                    Rerender={Rerender}
                    ChangeUrl={props.ChangeUrl}
                ></Pagination>
            </main>
        </>
    )
}
