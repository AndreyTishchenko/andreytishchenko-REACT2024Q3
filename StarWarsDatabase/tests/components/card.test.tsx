import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import IPlanet from '../../src/Types/PlanetType'
import Card from '../../src/components/card/card'
describe('group', () => {
    it('should', () => {
        const Planet:IPlanet = {
            name: "Tatooine",
            rotation_period: "23",
            orbital_period: "304",
            diameter: "10465",
            climate: "arid",
            gravity: "1 standard",
            terrain: "desert",
            surface_water: "1",
            population: "200000",
            residents: [
                "https://swapi.dev/api/people/1/",
            ],
            films: [
                "https://swapi.dev/api/films/1/",
            ],
            created: "2014-12-09T13:50:49.641000Z",
            edited: "2014-12-20T20:58:18.411000Z",
            url: "https://swapi.dev/api/planets/1/"
        }
        render(<Card planet={Planet} index={'1'} />)
        const CardRole = screen.getByRole('card');
        expect(CardRole).toBeInTheDocument();
    })
})
