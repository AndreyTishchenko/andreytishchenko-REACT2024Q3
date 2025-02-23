// CardList.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import CardList from '../components/CardsList/CradsList' // adjust the path as needed
import { MyContext } from '../components/myContext/myContext'
import { setupStore } from '../store/store'
import * as reduxHooks from '../hooks/redux'
import { Planet } from '../components/main/type'
// ---
// Stub child components to simplify testing
vi.mock('../components/Card/Card', () => ({
    default: ({ planet }: { planet: Planet }) => (
        <div data-testid="card">{planet.name}</div>
    ),
}))

vi.mock('../components/FlyoutElement/FlyoutElement', () => ({
    default: () => <div data-testid="flyout">Flyout Element</div>,
}))

// ---
// Mock the RTK Query hook from your API calls file
import * as apiCalls from '../store/reducers/APiCalls'
const mockUseGetPlanetsQuery = (returnValue: Planet) => {
    vi.spyOn(apiCalls, 'useGetPlanetsQuery').mockReturnValue(returnValue)
}

// ---
// Dummy planet for testing
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

describe('CardList component', () => {
    let store: ReturnType<typeof setupStore>
    beforeEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
        store = setupStore()
    })

    // Helper to render CardList with necessary providers
    const renderComponent = (searchText = 'test') => {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/?page=1']}>
                    <MyContext.Provider
                        value={{ value: false, updateValue: vi.fn() }}
                    >
                        <CardList searchText={searchText} />
                    </MyContext.Provider>
                </MemoryRouter>
            </Provider>
        )
    }

    it('renders Loading state when isLoading is true', () => {
        mockUseGetPlanetsQuery({ isLoading: true })
        renderComponent()
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    })

    it('renders "No planets found." when no data is returned', () => {
        mockUseGetPlanetsQuery({ isLoading: false, data: null })
        renderComponent()
        expect(screen.getByText(/No planets found./i)).toBeInTheDocument()
    })

    it('renders "No planets found." when data has empty results', () => {
        mockUseGetPlanetsQuery({
            isLoading: false,
            data: { count: 0, next: null, previous: null, results: [] },
        })
        renderComponent()
        expect(screen.getByText(/No planets found./i)).toBeInTheDocument()
    })

    it('renders list of cards and navigation buttons when data is available', async () => {
        mockUseGetPlanetsQuery({
            isLoading: false,
            data: {
                count: 1,
                next: 'nextUrl',
                previous: 'prevUrl',
                results: [dummyPlanet],
            },
        })

        // Simulate redux state with an empty "planets" array
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({ planets: [] })

        renderComponent()

        // Wait for the card to render
        await waitFor(() => {
            expect(screen.getByTestId('card')).toHaveTextContent('Tatooine')
        })
        // Check that the navigation buttons are present
        expect(screen.getByText(/Previous Page/i)).toBeInTheDocument()
        expect(screen.getByText(/Next Page/i)).toBeInTheDocument()
        // Since redux state "planets" is empty, FlyoutElement should not render
        expect(screen.queryByTestId('flyout')).not.toBeInTheDocument()
    })

    it('renders FlyoutElement when redux planets array is not empty', async () => {
        mockUseGetPlanetsQuery({
            isLoading: false,
            data: {
                count: 1,
                next: 'nextUrl',
                previous: 'prevUrl',
                results: [dummyPlanet],
            },
        })

        // Simulate redux state with one planet to trigger FlyoutElement
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            planets: [dummyPlanet],
        })

        renderComponent()
        await waitFor(() => {
            expect(screen.getByTestId('flyout')).toBeInTheDocument()
        })
    })

    it('calls nextPage and previousPage functions when navigation buttons are clicked', async () => {
        mockUseGetPlanetsQuery({
            isLoading: false,
            data: {
                count: 1,
                next: 'nextUrl',
                previous: 'prevUrl',
                results: [dummyPlanet],
            },
        })
        vi.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({ planets: [] })

        // Spy on localStorage.removeItem
        const removeItemSpy = vi.spyOn(
            window.localStorage.__proto__,
            'removeItem'
        )

        renderComponent()

        // Wait for navigation buttons to appear
        await waitFor(() => {
            expect(screen.getByText(/Next Page/i)).toBeInTheDocument()
            expect(screen.getByText(/Previous Page/i)).toBeInTheDocument()
        })

        const nextButton = screen.getByText(/Next Page/i)
        const prevButton = screen.getByText(/Previous Page/i)

        fireEvent.click(nextButton)
        expect(removeItemSpy).toHaveBeenCalledWith('prevSearchText')

        fireEvent.click(prevButton)
        expect(removeItemSpy).toHaveBeenCalledWith('prevSearchText')
    })
})
