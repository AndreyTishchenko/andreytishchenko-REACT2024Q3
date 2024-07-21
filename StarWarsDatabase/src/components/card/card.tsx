import IPlanet from '../../Types/PlanetType'

export default function Card(prop: { index: string; planet: IPlanet }) {
    return (
        <>
            <div
                key={String(
                    prop.index +
                        1 +
                        Number(localStorage.getItem('CurrentPage')) * 10
                )}
                className={'card'}
            >
                <h3>{prop.planet.name}</h3>
                <p>
                    diameter: <span>{prop.planet.diameter}</span>
                </p>
                <p>
                    rotation_period: <span>{prop.planet.rotation_period}</span>
                </p>
                <p>
                    orbital_period: <span>{prop.planet.orbital_period}</span>
                </p>
                <p>
                    gravity: <span>{prop.planet.gravity}</span>
                </p>
                <p>
                    population: <span>{prop.planet.population}</span>
                </p>
                <p>
                    climate: <span>{prop.planet.climate}</span>
                </p>
                <p>
                    terrain: <span>{prop.planet.terrain}</span>
                </p>
                <p>
                    surface_water: <span>{prop.planet.surface_water}</span>
                </p>
            </div>
        </>
    )
}
