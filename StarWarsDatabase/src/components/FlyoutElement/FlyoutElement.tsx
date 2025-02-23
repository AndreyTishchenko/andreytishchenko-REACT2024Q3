import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { planetsSlice } from '../../store/reducers/PlanetsSlice'

export default function FlyoutElement() {
    const { planets } = useAppSelector((state) => state.planetReducer)
    const { deletePlanet } = planetsSlice.actions
    const Dispatch = useAppDispatch()

    function deleteAll() {
        planets.forEach((planet) => {
            console.log(planet + 'this Planet Will be deleted')
            Dispatch(deletePlanet(planet.id))
            console.log(planets)
        })
    }

    return (
        <div>
            <h3>Choosen Elements: {planets.length}</h3>
            <button onClick={deleteAll}>Unselect All</button>
        </div>
    )
}
