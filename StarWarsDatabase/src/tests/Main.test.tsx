import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Main from '../components/main/Main'

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router-dom')
    return actual
})

vi.mock('../components/CardsList/CradsList', () => ({
    default: ({ searchText }: { searchText: string }) => (
        <div data-testid="cardlist">CardList: {searchText}</div>
    ),
}))

describe('Main component', () => {
    it('renders a main element with center justifyContent when not on details page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Main SearchText="test" />} />
                </Routes>
            </MemoryRouter>
        )
        const mainElement = screen.getByRole('main')
        expect(mainElement).toBeInTheDocument()
        expect(mainElement).toHaveStyle({ justifyContent: 'center' })
    })

    it('renders a main element with space-between justifyContent when on details page', () => {
        render(
            <MemoryRouter initialEntries={['/details']}>
                <Routes>
                    <Route
                        path="/details"
                        element={<Main SearchText="test" />}
                    />
                </Routes>
            </MemoryRouter>
        )
        const mainElement = screen.getByRole('main')
        expect(mainElement).toBeInTheDocument()
        expect(mainElement).toHaveStyle({ justifyContent: 'space-between' })
    })

    it('renders CardList with the correct searchText prop', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Main SearchText="hello" />} />
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByTestId('cardlist')).toHaveTextContent(
            'CardList: hello'
        )
    })

    it('renders Outlet content when child route is provided', () => {
        render(
            <MemoryRouter initialEntries={['/child']}>
                <Routes>
                    <Route path="/" element={<Main SearchText="test" />}>
                        <Route
                            path="child"
                            element={
                                <div data-testid="outlet">Outlet Content</div>
                            }
                        />
                    </Route>
                </Routes>
            </MemoryRouter>
        )
        expect(screen.getByTestId('outlet')).toHaveTextContent('Outlet Content')
    })
})
