import {
    render,
    screen,
    fireEvent,
    waitFor,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import CardList from '../components/CardsList/CradsList'
import { getPlanets } from '../API/api'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ReactElement } from 'react'
import { Planet } from '../components/main/type'

vi.mock('../API/api', () => ({
    getPlanets: vi.fn(),
}))

describe('CardList Component', () => {
    const mockPlanets = {
        count: 2,
        next: 'next-page-url',
        previous: null,
        results: [
            {
                name: 'Tatooine',
                diameter: '10465',
                rotation_period: '23',
                orbital_period: '304',
                gravity: '1 standard',
                population: '200000',
                climate: 'arid',
                terrain: 'desert',
                surface_water: '1',
                residents: [
                    'https://swapi.dev/api/people/1/',
                    'https://swapi.dev/api/people/2/',
                ],
                films: [
                    'https://swapi.dev/api/films/1/',
                    'https://swapi.dev/api/films/3/',
                ],
                url: 'https://swapi.dev/api/planets/1/',
                created: '2014-12-09T13:50:49.641000Z',
                edited: '2014-12-20T20:58:18.411000Z',
            },
            {
                name: 'Alderaan',
                diameter: '10465',
                rotation_period: '23',
                orbital_period: '304',
                gravity: '1 standard',
                population: '200000',
                climate: 'arid',
                terrain: 'desert',
                surface_water: '1',
                residents: [
                    'https://swapi.dev/api/people/1/',
                    'https://swapi.dev/api/people/2/',
                ],
                films: [
                    'https://swapi.dev/api/films/1/',
                    'https://swapi.dev/api/films/3/',
                ],
                url: 'https://swapi.dev/api/planets/1/',
                created: '2014-12-09T13:50:49.641000Z',
                edited: '2014-12-20T20:58:18.411000Z',
            },
        ],
    }

    vi.mock('../components/Card/Card', () => ({
        default: ({ planet }: { planet: Planet }) => <div>{planet.name}</div>,
    }))

    beforeEach(() => {
        vi.clearAllMocks()
    })

    function renderWithRouter(ui: ReactElement) {
        return render(<MemoryRouter>{ui}</MemoryRouter>)
    }

    test('renders loading state initially', async () => {
        ;(getPlanets as jest.Mock).mockResolvedValue(null)
        renderWithRouter(<CardList searchText="Tatooine" />)
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
    })

    test('renders planets after fetching data', async () => {
        ;(getPlanets as jest.Mock).mockResolvedValue(mockPlanets)
        renderWithRouter(<CardList searchText="Tatooine" />)

        await waitFor(() => {
            expect(screen.getByText('Tatooine')).toBeInTheDocument()
            expect(screen.getByText('Alderaan')).toBeInTheDocument()
        })
    })

    test('shows no planets found message when API returns no results', async () => {
        ;(getPlanets as jest.Mock).mockResolvedValue({
            count: 0,
            next: null,
            previous: null,
            results: [],
        })
        renderWithRouter(<CardList searchText="Unknown" />)

        await waitFor(() => {
            expect(screen.getByText(/No planets found./i)).toBeInTheDocument()
        })
    })

    test('handles next page button click', async () => {
        ;(getPlanets as jest.Mock).mockResolvedValue(mockPlanets)
        renderWithRouter(<CardList searchText="Tatooine" />)

        // Дождаться, пока исчезнет элемент с текстом Loading...
        await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))

        // Теперь искать кнопку Next Page
        const nextPageButton = screen.getByText(/Next Page/i)
        fireEvent.click(nextPageButton)

        await waitFor(() => {
            expect(getPlanets).toHaveBeenCalledWith('Tatooine', 10, 2)
        })
    })

    test('handles previous page button click', async () => {
        ;(getPlanets as jest.Mock).mockResolvedValue({
            ...mockPlanets,
            previous: 'prev-page-url',
        })
        renderWithRouter(<CardList searchText="Tatooine" />)

        await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i))

        const prevPageButton = screen.getByText(/Previous Page/i)
        fireEvent.click(prevPageButton)

        await waitFor(() => {
            expect(getPlanets).toHaveBeenCalledWith('Tatooine', 10, 0)
        })
    })
})
