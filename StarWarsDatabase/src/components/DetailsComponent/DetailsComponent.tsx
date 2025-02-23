import { useCallback, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useGetPlanetQuery } from '../../store/reducers/APiCalls'
import './style.css'

export default function DetailsComponent() {
    const [searchParams] = useSearchParams()
    const PlanetID = searchParams.get('card') || ''
    const { data: planet, isLoading } = useGetPlanetQuery(PlanetID)
    const navigate = useNavigate()

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            const modal = document.getElementById('modal')
            if (modal && !modal.contains(event.target as Node)) {
                navigate('/')
            }
            searchParams.delete('card')
        },
        [navigate, searchParams]
    )

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div id="modal" className="modal">
                    <h2>{planet?.name}</h2>
                    <p>Diameter: {planet?.diameter}</p>
                    <p>Rotation Period: {planet?.rotation_period}</p>
                    <p>Orbital Period: {planet?.orbital_period}</p>
                    <p>Gravity: {planet?.gravity}</p>
                    <p>Population: {planet?.population}</p>
                    <p>Climate: {planet?.climate}</p>
                    <p>Terrain: {planet?.terrain}</p>
                    <p>Surface Water: {planet?.surface_water}</p>
                </div>
            )}
        </>
    )
}
