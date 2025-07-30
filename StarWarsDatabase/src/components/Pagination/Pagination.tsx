// import Result from "../../API/interface"

// export default function Pagination(planetList: Result | null) {

//     function nextPage( ) {
//         if (planetList?.next !== null) {
//             console.log(planetList?.next)
//             localStorage.setItem('CurrentPage', String(Number(pageNumber) + 1))
//             changePage(localStorage.getItem('CurrentPage') || '2')
//             console.log(pageNumber)
//             localStorage.removeItem('prevSearchText')
//         }
//     }

//     function previousPage() {
//         if (planetList?.previous !== null) {
//             localStorage.setItem('CurrentPage', String(Number(pageNumber) - 1))
//             changePage(localStorage.getItem('CurrentPage') || '2')
//             localStorage.removeItem('prevSearchText')
//         }
//     }

//     return (
//         <div className="navigation">
//             <button onClick={previousPage}>Previous Page</button>
//             <button onClick={nextPage}>Next Page</button>
//         </div>
//     )
// }
