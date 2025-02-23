// src/tests/Card.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Card from '../components/Card/Card' // adjust the path as needed
import { MyContext } from '../components/myContext/myContext'
import { planetsSlice } from '../store/reducers/PlanetsSlice'

// We'll mock our Redux hooks from our custom hooks file.
import * as reduxHooks from '../hooks/redux'
interface Planet {
    id: string
    name: string
    diameter: string
    rotation_period: string
    orbital_period: string
    gravity: string
    population: string
    climate: string
    terrain: string
    surface_water: string
    residents: string[]
    films: string[]
    url: string
    created: string
    edited: string
}
// Dummy planet for testing. Note: the helper getId returns the second‐to‐last segment, so for the URL below it will be "1".
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
        // Stub our Redux hooks.
        vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(mockDispatch)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    // Helper to render Card with required providers.
    // The redux state is provided via useAppSelector; here we supply a planets array.
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
        // Without "light" class when context.value is false.
        expect(linkElement).toHaveClass('card')
        // The helper getId returns "1" so id and href should include "1".
        expect(linkElement).toHaveAttribute('id', '1')
        expect(linkElement).toHaveAttribute('href', '/details?card=1')
        // Check that the planet's name and several pieces of info are rendered.
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
            'Tatooine'
        )
        expect(screen.getByText(/diameter:/i)).toBeInTheDocument()
        expect(screen.getByText(/rotation_period:/i)).toBeInTheDocument()
        expect(screen.getByText(/gravity:/i)).toBeInTheDocument()
        expect(screen.getByText(/population:/i)).toBeInTheDocument()
        expect(screen.getByText(/surface_water:/i)).toBeInTheDocument()
        // (If needed, you can target the span elements more specifically.)
    })

    it('applies "light" class when context value is true', () => {
        renderCard(true, [])
        const linkElement = screen.getByRole('link')
        expect(linkElement).toHaveClass('card light')
    })

    it('renders checkbox unchecked if planet is not in redux state', () => {
        renderCard(false, []) // Redux state does not include this planet.
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()
    })

    it('renders checkbox checked if planet is in redux state', () => {
        // Provide the planet (with id "1") in redux state.
        renderCard(false, [{ ...dummyPlanet, id: '1' }])
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
    })

    it('dispatches addPlanet when checkbox is toggled from unchecked to checked', async () => {
        renderCard(false, []) // initial state: planet not present.
        const checkbox = screen.getByRole('checkbox')
        // Use userEvent to simulate user clicking the checkbox.
        await userEvent.click(checkbox)
        // After clicking, onChange should fire and dispatch addPlanet.
        const expectedAction = planetsSlice.actions.addPlanet({
            id: '1',
            ...dummyPlanet,
        })
        expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    })

    it('dispatches deletePlanet when checkbox is toggled from checked to unchecked', async () => {
        renderCard(false, [{ ...dummyPlanet, id: '1' }]) // initial state: planet is present.
        const checkbox = screen.getByRole('checkbox')
        // The checkbox is initially checked. Click it to uncheck.
        await userEvent.click(checkbox)
        const expectedAction = planetsSlice.actions.deletePlanet('1')
        expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
    })

    it('calls event.stopPropagation on checkbox click', async () => {
        renderCard(false, [])
        const checkbox = screen.getByRole('checkbox')
        // Create a synthetic event with a spy for stopPropagation.
        const event = new MouseEvent('click', { bubbles: true })
        const stopPropagationSpy = vi.spyOn(event, 'stopPropagation')
        // Dispatch the event on the checkbox.
        checkbox.dispatchEvent(event)
        expect(stopPropagationSpy).toHaveBeenCalled()
    })

    it('throws an error if MyContext is not provided', () => {
        // Stub Redux state to avoid errors from useAppSelector.
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({ planets: [] })
        expect(() =>
            render(
                <MemoryRouter>
                    {/* MyContext.Provider is omitted intentionally */}
                    <Card planet={dummyPlanet} SetCardId={vi.fn()} />
                </MemoryRouter>
            )
        ).toThrow('Error')
    })
})
