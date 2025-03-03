import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Card from '../components/Card/Card'
import { MyContext } from '../components/myContext/myContext'
import { planetsSlice } from '../store/reducers/PlanetsSlice'
import { Planet } from '../Types/PlanetType'
import * as reduxHooks from '../hooks/redux'

const dummyPlanet = {
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

describe('Card component', () => {
    let mockDispatch: ReturnType<typeof vi.fn>

    beforeEach(() => {
        mockDispatch = vi.fn()
        vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(mockDispatch)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    const renderCard = (contextValue: boolean, reduxPlanets: Planet[] = []) => {
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            planets: reduxPlanets,
        })
        return render(
            <MemoryRouter>
                <MyContext.Provider
                    value={{ value: contextValue, updateValue: vi.fn() }}
                >
                    <Card planet={dummyPlanet} SetCardId={vi.fn()} />
                </MyContext.Provider>
            </MemoryRouter>
        )
    }

    it('renders correctly with planet data and proper link attributes when context value is false', () => {
        renderCard(false, [])
        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveClass('card')
        expect(linkElement).toHaveAttribute('id', '1')
        expect(linkElement).toHaveAttribute('href', '/details?card=1')
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
            'Tatooine'
        )
        expect(screen.getByText(/diameter:/i)).toBeInTheDocument()
        expect(screen.getByText(/rotation_period:/i)).toBeInTheDocument()
        expect(screen.getByText(/gravity:/i)).toBeInTheDocument()
        expect(screen.getByText(/population:/i)).toBeInTheDocument()
        expect(screen.getByText(/surface_water:/i)).toBeInTheDocument()
    })

    it('applies "light" class when context value is true', () => {
        renderCard(true, [])
        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveClass('card light')
    })

    it('renders checkbox unchecked if planet is not in redux state', () => {
        renderCard(false, [])
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()
    })

    it('renders checkbox checked if planet is in redux state', () => {
        renderCard(false, [{ ...dummyPlanet, id: '1' }])
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
    })

    it('dispatches addPlanet when checkbox is toggled from unchecked to checked', async () => {
        renderCard(false, [])
        const checkbox = screen.getByRole('checkbox')
        await userEvent.click(checkbox)
        const expectedAction = planetsSlice.actions.addPlanet({
            id: '1',
            ...dummyPlanet,
        })
        expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    })

    it('dispatches deletePlanet when checkbox is toggled from checked to unchecked', async () => {
        renderCard(false, [{ ...dummyPlanet, id: '1' }])
        const checkbox = screen.getByRole('checkbox')
        await userEvent.click(checkbox)
        const expectedAction = planetsSlice.actions.deletePlanet('1')
        expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    })

    it('calls event.stopPropagation on checkbox click', async () => {
        renderCard(false, [])
        const checkbox = screen.getByRole('checkbox')
        const event = new MouseEvent('click', { bubbles: true })
        const stopPropagationSpy = vi.spyOn(event, 'stopPropagation')
        checkbox.dispatchEvent(event)
        expect(stopPropagationSpy).toHaveBeenCalled()
    })

    it('throws an error if MyContext is not provided', () => {
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({ planets: [] })
        expect(() =>
            render(
                <MemoryRouter>
                    <Card planet={dummyPlanet} SetCardId={vi.fn()} />
                </MemoryRouter>
            )
        ).toThrow('Error')
    })
})
