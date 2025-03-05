// src/components/DetailsComponent/DetailsComponent.tsx
import { useCallback, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useGetPlanetQuery } from '../../store/reducers/APiCalls'
import style from './style.module.css'
import { MyContext } from '../myContext/myContext'

export default function DetailsComponent(): JSX.Element {
    const router = useRouter()
    const PlanetID =
        typeof router.query.card === 'string' ? router.query.card : ''
    const { data: planet, isLoading } = useGetPlanetQuery(PlanetID)

    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Error')
    }
    const { value } = context

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            const modal = document.getElementById('modal')
            if (modal && !modal.contains(event.target as Node)) {
                // Собираем новый объект query без undefined и без параметра "card"
                const newQuery: { [key: string]: string | string[] } = {}
                for (const key in router.query) {
                    const val = router.query[key]
                    if (val !== undefined && key !== 'card') {
                        newQuery[key] = val
                    }
                }
                router.push({ pathname: '/', query: newQuery })
            }
        },
        [router]
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
                <p style={{ color: value ? 'rgb(0, 183, 255)' : undefined }}>
                    Loading...
                </p>
            ) : (
                <div
                    id="modal"
                    className={`${style.modal} ${value ? style.light : ''}`}
                >
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
