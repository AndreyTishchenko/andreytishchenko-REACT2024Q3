import { Link } from 'react-router'
import { Planet } from '../main/type'
import './Card.css'
export default function Card(props: { planet: Planet }): React.ReactNode {
    function getId(url: string) {
        const parts = url.split('/')
        return parts[parts.length - 2]
    }

    return (
        <Link
            className="card"
            id={getId(props.planet.url)}
            to={`/details?card=${getId(props.planet.url)}`}
        >
            <h3>{props.planet.name}</h3>
            <p>
                diameter: <span>{props.planet.diameter}</span>
            </p>
            <p>
                rotation_period: <span>{props.planet.rotation_period}</span>
            </p>
            <p>
                orbital_period: <span>{props.planet.orbital_period}</span>
            </p>
            <p>
                gravity: <span>{props.planet.gravity}</span>
            </p>
            <p>
                population: <span>{props.planet.population}</span>
            </p>
            <p>
                climate: <span>{props.planet.climate}</span>
            </p>
            <p>
                terrain: <span>{props.planet.terrain}</span>
            </p>
            <p>
                surface_water: <span>{props.planet.surface_water}</span>
            </p>
        </Link>
    )
}
