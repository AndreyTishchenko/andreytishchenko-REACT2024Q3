import Link from 'next/link'
import { Planet } from '../../Types/PlanetType'
import styles from './Card.module.css'
import { planetsSlice } from '../../store/reducers/PlanetsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useContext } from 'react'
import { MyContext } from '../myContext/myContext'
export default function Card(props: { planet: Planet }): React.ReactNode {
    const { planets } = useAppSelector((state) => state.planetReducer)
    const { addPlanet, deletePlanet } = planetsSlice.actions
    const Dispatch = useAppDispatch()
    const planetWithCUrrentID = planets.find(
        (planet) => planet.id === getId(props.planet.url)
    )

    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Error')
    }

    const { value } = context

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
    }

    return (
        <Link
            href={`/details?card=${getId(props.planet.url)}`}
            className={`${styles.card} ${value ? styles.light : ''}`}
            id={getId(props.planet.url)}
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
