import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './style.css'
import { getPlanet } from '../../API/api'
import { Planet } from '../main/type'

export default function DetailsComponent() {
    const searchParams = useSearchParams()[0]
    const PlanetID = useState(searchParams.get('card'))[0]
    const [planet, setPlanet] = useState<null | Planet>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    const HandleClickOutside = useCallback(
        function (event: MouseEvent) {
            const modal = document.getElementById('modal')
            if (modal && !modal.contains(event.target as Node)) {
                navigate('/') // Переключаемся на главную
            }
            searchParams.delete('card')
        },
        [navigate, searchParams]
    )

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const results = await getPlanet(String(PlanetID))
                setPlanet(results)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [PlanetID, HandleClickOutside])

    useEffect(() => {
        document.addEventListener('mousedown', HandleClickOutside)
        return () =>
            document.removeEventListener('mousedown', HandleClickOutside)
    }, [HandleClickOutside])

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div id="modal" className="modal">
                    <h2>{planet?.name}</h2>
                    <p>diameter: {planet?.diameter}</p>
                    <p>rotation_period: {planet?.rotation_period}</p>
                    <p>orbital_period: {planet?.orbital_period}</p>
                    <p>gravity: {planet?.gravity}</p>
                    <p>population: {planet?.population}</p>
                    <p>climate: {planet?.climate}</p>
                    <p>terrain: {planet?.terrain}</p>
                    <p>surface_water: {planet?.surface_water}</p>
                </div>
            )}
        </>
    )
}
