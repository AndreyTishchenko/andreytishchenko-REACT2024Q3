import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import DetailsComponent from '../components/DetailsComponent/DetailsComponent'
import { getPlanet } from '../API/api'
import { vi } from 'vitest'

// ✅ Mock the entire module, but define getPlanet inside each test

vi.mock('../API/api')

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
}

test('displays loading indicator initially', async () => {
    // ✅ Explicitly mock getPlanet inside the test
    ;(getPlanet as jest.Mock).mockResolvedValue(mockPlanet)

    render(
        <MemoryRouter initialEntries={['/details?card=1']}>
            <Routes>
                <Route path="/details" element={<DetailsComponent />} />
            </Routes>
        </MemoryRouter>
    )

    expect(screen.getByText(/Loading/i)).toBeInTheDocument()
})

beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {}) // Mock console.error
})

afterEach(() => {
    vi.restoreAllMocks() // Restore original console.error after each test
})

test('handles error when getPlanet fails', async () => {
    ;(getPlanet as jest.Mock).mockRejectedValue(new Error('Network error'))

    render(
        <MemoryRouter initialEntries={['/details?card=1']}>
            <Routes>
                <Route path="/details" element={<DetailsComponent />} />
            </Routes>
        </MemoryRouter>
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith(
            'Failed to fetch data:',
            expect.any(Error)
        )
    })

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
})

test('renders planet details after loading', async () => {
    ;(getPlanet as jest.Mock).mockResolvedValue(mockPlanet)

    render(
        <MemoryRouter initialEntries={['/details?card=1']}>
            <Routes>
                <Route path="/details" element={<DetailsComponent />} />
            </Routes>
        </MemoryRouter>
    )

    await waitFor(() =>
        expect(screen.getByText('Tatooine')).toBeInTheDocument()
    )
})

test('closes the modal and navigates back when clicking outside', async () => {
    ;(getPlanet as jest.Mock).mockResolvedValue(mockPlanet)

    render(
        <MemoryRouter initialEntries={['/details?card=1']}>
            <Routes>
                <Route path="/details" element={<DetailsComponent />} />
                <Route path="/" element={<p>Home Page</p>} />
            </Routes>
        </MemoryRouter>
    )

    await waitFor(() =>
        expect(screen.getByText('Tatooine')).toBeInTheDocument()
    )

    // Click outside the modal
    await userEvent.click(document.body)

    await waitFor(() =>
        expect(screen.getByText('Home Page')).toBeInTheDocument()
    )
})
