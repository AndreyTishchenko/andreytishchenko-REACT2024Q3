'use client'

import { useCallback, useContext, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useGetPlanetQuery } from '../../store/reducers/APiCalls'
import { MyContext } from '../myContext/myContext'
import style from './style.module.css'

export default function DetailsComponent(): JSX.Element {
    const searchParams = useSearchParams()
    const router = useRouter()

    const { data: planet, isLoading } = useGetPlanetQuery(
        searchParams.get('card')!,
        {
            skip: !searchParams.get('card'),
        }
    )

    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Error')
    }
    const { value } = context

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            const modal = document.getElementById('modal')
            if (modal && !modal.contains(event.target as Node)) {
                router.push('/')
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

    if (!searchParams.get('card')) {
        return <div />
    }

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
