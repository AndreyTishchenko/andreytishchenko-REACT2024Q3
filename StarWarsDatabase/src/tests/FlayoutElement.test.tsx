// src/tests/FlyoutElement.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import FlyoutElement from '../components/FlyoutElement/FlyoutElement'
import { MyContext } from '../components/myContext/myContext'
import { planetsSlice } from '../store/reducers/PlanetsSlice'
import * as reduxHooks from '../hooks/redux'

// Dummy planets array for testing
const dummyPlanets = [
    {
        id: '1',
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
    },
    {
        id: '2',
        name: 'Alderaan',
        diameter: '12500',
        rotation_period: '24',
        orbital_period: '364',
        gravity: '1 standard',
        population: '2000000000',
        climate: 'temperate',
        terrain: 'grasslands, mountains',
        surface_water: '40',
        residents: [],
        films: [],
        url: 'https://swapi.dev/api/planets/2/',
        created: '',
        edited: '',
    },
]

describe('FlyoutElement component', () => {
    let mockDispatch: ReturnType<typeof vi.fn>

    beforeEach(() => {
        // Set up our mocks for redux hooks
        mockDispatch = vi.fn()
        vi.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(mockDispatch)
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            planets: dummyPlanets,
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders header with correct text and applies "light" class when context.value is true', () => {
        render(
            <MyContext.Provider value={{ value: true, updateValue: vi.fn() }}>
                <FlyoutElement />
            </MyContext.Provider>
        )
        const header = screen.getByRole('heading', { level: 3 })
        expect(header).toHaveTextContent(
            `Choosen Elements: ${dummyPlanets.length}`
        )
        expect(header).toHaveClass('light')
    })

    it('renders header with correct text without "light" class when context.value is false', () => {
        render(
            <MyContext.Provider value={{ value: false, updateValue: vi.fn() }}>
                <FlyoutElement />
            </MyContext.Provider>
        )
        const header = screen.getByRole('heading', { level: 3 })
        expect(header).toHaveTextContent(
            `Choosen Elements: ${dummyPlanets.length}`
        )
        expect(header).not.toHaveClass('light')
    })

    it('calls deletePlanet action for each planet when "Unselect All" button is clicked', () => {
        render(
            <MyContext.Provider value={{ value: true, updateValue: vi.fn() }}>
                <FlyoutElement />
            </MyContext.Provider>
        )
        const unselectButton = screen.getByText(/Unselect All/i)
        fireEvent.click(unselectButton)

        dummyPlanets.forEach((planet) => {
            const expectedAction = planetsSlice.actions.deletePlanet(planet.id)
            expect(mockDispatch).toHaveBeenCalledWith(expectedAction)
        })
        expect(mockDispatch).toHaveBeenCalledTimes(dummyPlanets.length)
    })

    it('triggers file download when "Download All" button is clicked', async () => {
        // Store the original document.createElement function.
        const originalCreateElement = document.createElement.bind(document)
        // Create a real anchor element to serve as our fake anchor.
        const fakeAnchor = originalCreateElement('a')
        // Override its methods with spies.
        fakeAnchor.setAttribute = vi.fn()
        fakeAnchor.click = vi.fn()

        // Spy on document.createElement so that when 'a' is requested, we return our fake anchor.
        const createElementSpy = vi
            .spyOn(document, 'createElement')
            .mockImplementation((tagName: string) => {
                if (tagName === 'a') {
                    return fakeAnchor
                }
                return originalCreateElement(tagName)
            })

        const appendChildSpy = vi.spyOn(document.body, 'appendChild')
        const removeChildSpy = vi.spyOn(document.body, 'removeChild')

        render(
            <MyContext.Provider value={{ value: true, updateValue: vi.fn() }}>
                <FlyoutElement />
            </MyContext.Provider>
        )

        const downloadButton = screen.getByText(/Download All/i)
        await userEvent.click(downloadButton)

        // Check that an anchor element was created.
        expect(createElementSpy).toHaveBeenCalledWith('a')
        // Check that the anchor was appended to the document body.
        expect(appendChildSpy).toHaveBeenCalledWith(fakeAnchor)
        // Check that the anchor's click method was called.
        expect(fakeAnchor.click).toHaveBeenCalled()
        // Check that the anchor was removed from the document body.
        expect(removeChildSpy).toHaveBeenCalledWith(fakeAnchor)
    })

    it('throws an error if MyContext is not provided', () => {
        expect(() => render(<FlyoutElement />)).toThrow('Error')
    })
})
