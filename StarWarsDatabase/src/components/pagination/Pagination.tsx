import IPropsType from './PropsType'

export default function Pagination(props: IPropsType) {
    function nextPage() {
        localStorage.setItem(
            'CurrentPage',
            String(Number(localStorage.getItem('CurrentPage')) + 1)
        )
        localStorage.removeItem('prevSearchText')
        props.ChangeUrl(String(localStorage.getItem('CurrentPage')))
    }

    function previousPage() {
        localStorage.setItem(
            'CurrentPage',
            String(Number(localStorage.getItem('CurrentPage')) - 1)
        )
        localStorage.removeItem('prevSearchText')
        props.ChangeUrl(String(localStorage.getItem('CurrentPage')))
    }

    return (
        <>
            <div className="navigation">
                {props.APIresults?.previous !== null ? (
                    <button onClick={previousPage}>Previous Page</button>
                ) : (
                    <button style={{ opacity: 0.3 }}>Previous Page</button>
                )}
                {props.APIresults?.next !== null ? (
                    <button onClick={nextPage}>Next Page</button>
                ) : (
                    <button style={{ opacity: 0.3 }}>Next Page</button>
                )}
            </div>
        </>
    )
}
