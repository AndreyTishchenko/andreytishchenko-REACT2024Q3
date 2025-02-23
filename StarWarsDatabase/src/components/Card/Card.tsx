import { Link } from 'react-router-dom'
import { Planet } from '../main/type'
import './Card.css'
import { planetsSlice } from '../../store/reducers/PlanetsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
export default function Card(props: {
    planet: Planet
    SetCardId: React.Dispatch<React.SetStateAction<string>>
    checked: boolean
}): React.ReactNode {
    const { planets } = useAppSelector((state) => state.planetReducer)
    const { addPlanet, deletePlanet } = planetsSlice.actions
    const Dispatch = useAppDispatch()
    const planetWithCUrrentID = planets.find(
        (planet) => planet.id === getId(props.planet.url)
    )

    function getId(url: string) {
        const parts = url.split('/')
        return parts[parts.length - 2]
    }

    function HandleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            Dispatch(
                addPlanet({ id: getId(props.planet.url), ...props.planet })
            )
        } else {
            Dispatch(deletePlanet(getId(props.planet.url)))
        }
        console.log(planets)
    }

    return (
        <Link
            className="card"
            id={getId(props.planet.url)}
            to={`/details?card=${getId(props.planet.url)}`}
            style={{ position: 'relative' }}
        >
            <h3>{props.planet.name}</h3>
            <p>
                diameter: <span>{props.planet.diameter}</span>
            </p>
            <p>
                rotation_period: <span>{props.planet.rotation_period}</span>
            </p>
            <p>
                gravity: <span>{props.planet.gravity}</span>
            </p>
            <p>
                population: <span>{props.planet.population}</span>
            </p>
            <p>
                surface_water: <span>{props.planet.surface_water}</span>
            </p>
            <input
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    zIndex: '100',
                }}
                type="checkbox"
                checked={planetWithCUrrentID ? true : false}
                onClick={(e) => e.stopPropagation()}
                onChange={HandleCheckbox}
            />
        </Link>
    )
}
