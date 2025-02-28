import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import DetailsComponent from '../components/DetailsComponent/DetailsComponent'
import { MyContext } from '../components/myContext/myContext'
import * as apiCalls from '../store/reducers/APiCalls'

interface Planet {
    name: string
    diameter: string
    rotation_period: string
    orbital_period: string
    gravity: string
    population: string
    climate: string
    terrain: string
    surface_water: string
    residents: unknown[]
    films: unknown[]
    url: string
    created: string
    edited: string
}

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('DetailsComponent', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders loading state when isLoading is true', () => {
        vi.spyOn(apiCalls, 'useGetPlanetQuery').mockReturnValue({
            data: undefined,
            isLoading: true,
            refetch: vi.fn(),
        } as ReturnType<typeof apiCalls.useGetPlanetQuery>)

        render(
            <MemoryRouter initialEntries={['/?card=1']}>
                <MyContext.Provider
                    value={{ value: false, updateValue: vi.fn() }}
                >
                    <DetailsComponent />
                </MyContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    })

    it('renders planet details when data is available', async () => {
        const dummyPlanet: Planet = {
            name: 'Tatooine',
            diameter: '10465',
            rotation_period: '23',
            orbital_period: '304',
            gravity: '1 standard',
            population: '200000',
            climate: 'arid',
            terrain: 'desert',
            surface_water: '1',
            residents: [],
            films: [],
            url: 'https://swapi.dev/api/planets/1/',
            created: '',
            edited: '',
        }

        vi.spyOn(apiCalls, 'useGetPlanetQuery').mockReturnValue({
            data: dummyPlanet,
            isLoading: false,
            refetch: vi.fn(),
        } as ReturnType<typeof apiCalls.useGetPlanetQuery>)

        render(
            <MemoryRouter initialEntries={['/?card=1']}>
                <MyContext.Provider
                    value={{ value: true, updateValue: vi.fn() }}
                >
                    <DetailsComponent />
                </MyContext.Provider>
            </MemoryRouter>
        )

        await waitFor(() => {
            const modal = document.getElementById('modal')
            expect(modal).toBeInTheDocument()
        })
        const modal = document.getElementById('modal')
        expect(modal).toHaveClass('modal light')
        expect(screen.getByText('Tatooine')).toBeInTheDocument()
        expect(screen.getByText(/Diameter:/i)).toBeInTheDocument()
        expect(screen.getByText(/Rotation Period:/i)).toBeInTheDocument()
        expect(screen.getByText(/Orbital Period:/i)).toBeInTheDocument()
        expect(screen.getByText(/Gravity:/i)).toBeInTheDocument()
        expect(screen.getByText(/Population:/i)).toBeInTheDocument()
        expect(screen.getByText(/Climate:/i)).toBeInTheDocument()
        expect(screen.getByText(/Terrain:/i)).toBeInTheDocument()
        expect(screen.getByText(/Surface Water:/i)).toBeInTheDocument()
    })

    it('navigates to "/" when clicking outside the modal', async () => {
        const dummyPlanet: Planet = {
            name: 'Tatooine',
            diameter: '10465',
            rotation_period: '23',
            orbital_period: '304',
            gravity: '1 standard',
            population: '200000',
            climate: 'arid',
            terrain: 'desert',
            surface_water: '1',
            residents: [],
            films: [],
            url: 'https://swapi.dev/api/planets/1/',
            created: '',
            edited: '',
        }

        vi.spyOn(apiCalls, 'useGetPlanetQuery').mockReturnValue({
            data: dummyPlanet,
            isLoading: false,
            refetch: vi.fn(),
        } as ReturnType<typeof apiCalls.useGetPlanetQuery>)

        render(
            <MemoryRouter initialEntries={['/?card=1']}>
                <MyContext.Provider
                    value={{ value: false, updateValue: vi.fn() }}
                >
                    <DetailsComponent />
                </MyContext.Provider>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(document.getElementById('modal')).toBeInTheDocument()
        })

        const outsideElement = document.createElement('div')
        document.body.appendChild(outsideElement)
        fireEvent.mouseDown(outsideElement)

        expect(mockNavigate).toHaveBeenCalledWith('/')
        document.body.removeChild(outsideElement)
    })

    it('throws an error if MyContext is not provided', () => {
        vi.spyOn(apiCalls, 'useGetPlanetQuery').mockReturnValue({
            data: undefined,
            isLoading: true,
            refetch: vi.fn(),
        } as ReturnType<typeof apiCalls.useGetPlanetQuery>)

        expect(() =>
            render(
                <MemoryRouter initialEntries={['/?card=1']}>
                    <DetailsComponent />
                </MemoryRouter>
            )
        ).toThrow('Error')
    })
})
