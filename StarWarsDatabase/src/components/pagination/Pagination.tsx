import IPropsType from './PropsType'

export default function Pagination(props: IPropsType) {
    function nextPage() {
        if (props.APIresults?.next !== null) {
            console.log(props.APIresults?.next)
            localStorage.setItem(
                'CurrentPage',
                String(Number(localStorage.getItem('CurrentPage')) + 1)
            )
            localStorage.removeItem('prevSearchText')
            props.Rerender()
            props.ChangeUrl(String(localStorage.getItem('CurrentPage')))
        }
    }

    function previousPage() {
        if (props.APIresults?.previous !== null) {
            localStorage.setItem(
                'CurrentPage',
                String(Number(localStorage.getItem('CurrentPage')) - 1)
            )
            localStorage.removeItem('prevSearchText')
            props.Rerender()
            props.ChangeUrl(String(localStorage.getItem('CurrentPage')))
        }
    }

    return (
        <>
            <div className="navigation">
                <button onClick={previousPage}>Previous Page</button>
                <button onClick={nextPage}>Next Page</button>
            </div>
        </>
    )
}
