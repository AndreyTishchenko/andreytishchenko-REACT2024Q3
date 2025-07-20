import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Main from './Main'
import getAPIresults from '../../API/api'

// Mock the API module
vi.mock('../../API/api', () => ({
    default: vi.fn(),
}))

const mockPlanet = {
    name: 'Tatooine',
    diameter: '10465',
    rotation_period: '23',
    orbital_period: '304',
    gravity: '1 standard',
    population: '200000',
    climate: 'arid',
    terrain: 'desert',
    surface_water: '1',
    created: '2025-01-01T00:00:00Z',
}

describe('Main component', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
    })

    it('shows loading and then renders planet data on mount', async () => {
        ;(getAPIresults as ReturnType<typeof vi.fn>).mockResolvedValue({
            results: [mockPlanet],
        })

        render(<Main SearchText="Tatooine" />)

        // Shows loading first
        expect(screen.getByText(/loading/i)).toBeInTheDocument()

        // Wait for the card to appear
        await waitFor(() => {
            expect(screen.getByText(/Tatooine/i)).toBeInTheDocument()
        })

        expect(screen.getByText(/diameter/i)).toHaveTextContent(
            'diameter: 10465'
        )
    })

    it('renders error message when results is null', async () => {
        ;(getAPIresults as ReturnType<typeof vi.fn>).mockResolvedValue({
            results: null,
        })

        render(<Main SearchText="Nowhere" />)

        await waitFor(() => {
            expect(
                screen.getByText(/Something went wrong/i)
            ).toBeInTheDocument()
        })
    })

    it('calls getAPIresults again on SearchText prop change', async () => {
        const mockApi = getAPIresults as ReturnType<typeof vi.fn>
        mockApi.mockResolvedValueOnce({ results: [mockPlanet] }) // for initial mount
        const { rerender } = render(<Main SearchText="Tatooine" />)

        await waitFor(() => {
            expect(screen.getByText('Tatooine')).toBeInTheDocument()
        })

        const newPlanet = {
            ...mockPlanet,
            name: 'Naboo',
            created: '2025-02-02',
        }
        mockApi.mockResolvedValueOnce({ results: [newPlanet] }) // for update

        rerender(<Main SearchText="Naboo" />)

        await waitFor(() => {
            expect(screen.getByText('Naboo')).toBeInTheDocument()
        })

        expect(mockApi).toHaveBeenCalledTimes(2)
        expect(mockApi).toHaveBeenCalledWith('Naboo', 10)
    })
})
