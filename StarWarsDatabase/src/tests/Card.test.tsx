import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Card from '../components/Card/Card'
import { Planet } from '../components/main/type'
import { vi } from 'vitest'

const mockPlanet: Planet = {
    name: 'Tatooine',
    diameter: '10465',
    rotation_period: '23',
    gravity: '1 standard',
    population: '200000',
    surface_water: '1',
    url: 'https://swapi.dev/api/planets/1/',
    orbital_period: '',
    climate: '',
    terrain: '',
    residents: [],
    films: [],
    created: '',
    edited: '',
}

const mockSetCardId = vi.fn() // ✅ Use a Vitest mock function

test('renders Card component with planet details', () => {
    render(
        <MemoryRouter>
            <Card planet={mockPlanet} SetCardId={mockSetCardId} />
        </MemoryRouter>
    )

    expect(screen.getByText('Tatooine')).toBeInTheDocument()
    expect(screen.getByText(/diameter:/i)).toHaveTextContent('diameter: 10465')
    expect(screen.getByText(/rotation_period:/i)).toHaveTextContent(
        'rotation_period: 23'
    )
    expect(screen.getByText(/gravity:/i)).toHaveTextContent(
        'gravity: 1 standard'
    )
    expect(screen.getByText(/population:/i)).toHaveTextContent(
        'population: 200000'
    )
    expect(screen.getByText(/surface_water:/i)).toHaveTextContent(
        'surface_water: 1'
    )
})

test('Card component links to correct details page', () => {
    render(
        <MemoryRouter>
            <Card planet={mockPlanet} SetCardId={mockSetCardId} />
        </MemoryRouter>
    )

    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '/details?card=1')
})
