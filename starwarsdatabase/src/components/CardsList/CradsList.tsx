import Card from '../Card/Card'
import Result from "../../Types/PlanetsResult";
// import FlyoutElement from '../FlyoutElement/FlyoutElement'
// import { useAppSelector } from '../../hooks/redux'
// import { useGetPlanetsQuery } from '../../store/reducers/APiCalls'
// import Pagination from '../Pagination/Pagination'

export default function CardList({ planetList }: { planetList: Result }) {
    // const location = useLocation()
    // const { planets } = useAppSelector((state) => state.planetReducer)
    // const pageNumber = searchParams.get('page')
    // const searchText = searchParams.get('search') || '';

    // useEffect(() => {
    //     const newParams = new URLSearchParams(searchParams)
    //     newParams.set('page', pageNumber)
    //     if (CardId && location.pathname === '/details') {
    //         newParams.set('card', CardId)
    //     }
    //     if (newParams.toString() !== searchParams.toString()) {
    //         setSearchParams(newParams)
    //     }
    // }, [pageNumber, CardId, location, searchParams, setSearchParams])

    // if (isLoading) {
        // return <Loading />
    // }
    console.log(planetList)
    if (!planetList || !planetList.result.length) {
        return <div>No planets found.</div>
    }

    return (
            <div className="CardList">
                <div className="grid-div">
                    {planetList.result.map((planet, index) => (
                        <Card
                            planet={planet}
                            key={index}
                            // SetCardId={setCardId}
                        />
                    ))}
                </div>
                {/* <Pagination
                    planetList={planetList}
                    changePage={changePage}
                    pageNumber={pageNumber}
                /> */}
            </div>
    )
}