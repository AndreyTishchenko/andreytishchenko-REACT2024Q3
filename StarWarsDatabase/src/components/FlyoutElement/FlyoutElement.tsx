import { useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { planetsSlice } from '../../store/reducers/PlanetsSlice'
import { MyContext } from '../myContext/myContext'
import './style.css'
export default function FlyoutElement() {
    const { planets } = useAppSelector((state) => state.planetReducer)
    const { deletePlanet } = planetsSlice.actions
    const Dispatch = useAppDispatch()

    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Error')
    }

    const { value } = context

    function deleteAll() {
        planets.forEach((planet) => {
            Dispatch(deletePlanet(planet.id!))
        })
    }

    function downloadAllInCSV() {
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            planets
                .map((planet) => {
                    return `PlanetName: ${planet.name},\nDiameter: ${planet.diameter},\nRotation Period: ${planet.rotation_period},\norbital_period: ${planet.orbital_period},\nGravity: ${planet.gravity},\nPopulation: ${planet.population},\nClimate: ${planet.climate},\nterrain: ${planet.terrain},\nsurface_water: ${planet.surface_water},\nresidents: ${planet.residents},\nfilms: ${planet.films},\nurl: ${planet.url},\nCreated: ${planet.created},\nEdited: ${planet.edited}\n\n`
                })
                .join('\n')
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `${planets.length}planets.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div>
            <h3 className={value ? 'light' : ''}>
                Choosen Elements: {planets.length}
            </h3>
            <button onClick={deleteAll}>Unselect All</button>
            <button onClick={downloadAllInCSV}>Download All</button>
        </div>
    )
}
