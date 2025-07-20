import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

describe('Header component', () => {
    const onSearchChange = vi.fn()

    it('renders logo image', () => {
        render(<Header onSearchChange={onSearchChange} />)
        const image = screen.getByAltText(/starWarsLogo/i)
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute(
            'src',
            expect.stringContaining('fullhdoboi')
        )
    })

    it('renders SearchForm component', () => {
        render(<Header onSearchChange={onSearchChange} />)
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()
    })

    //   it('throws error when Crash button is clicked', () => {
    // const { getByText, errorMessage } = renderWithErrorBoundary(
    //   <Header onSearchChange={onSearchChange} />
    // )
    //
    // const crashButton = getByText(/Crach System/i)
    // fireEvent.click(crashButton)
    //
    // expect(screen.getByText(/Error Boundary Triggered/)).toBeInTheDocument()
    // expect(errorMessage).toBe('Throw error by button')
    //   })
})
