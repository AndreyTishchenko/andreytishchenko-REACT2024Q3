import Result from '../../API/interface'

export default function Pagination(props: {
    planetList: Result
    changePage: (page: string) => void
    pageNumber: string
}) {
    function nextPage() {
        if (props.planetList?.next !== null) {
            console.log(props.planetList?.next)
            localStorage.setItem(
                'CurrentPage',
                String(Number(props.pageNumber) + 1)
            )
            props.changePage(localStorage.getItem('CurrentPage') || '2')
            console.log(props.pageNumber)
            localStorage.removeItem('prevSearchText')
        }
    }

    function previousPage() {
        if (props.planetList?.previous !== null) {
            localStorage.setItem(
                'CurrentPage',
                String(Number(props.pageNumber) - 1)
            )
            props.changePage(localStorage.getItem('CurrentPage') || '2')
            localStorage.removeItem('prevSearchText')
        }
    }

    return (
        <div className="navigation">
            <button onClick={previousPage}>Previous Page</button>
            <button onClick={nextPage}>Next Page</button>
        </div>
    )
}
