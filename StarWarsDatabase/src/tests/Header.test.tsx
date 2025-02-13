import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Header from '../components/header/Header'

describe('Header Component', () => {
    const mockOnSearchChange = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders logo, crash button, and SearchForm', () => {
        render(<Header onSearchChange={mockOnSearchChange} />)

        screen.debug() // Log DOM for debugging

        expect(
            screen.getByRole('img', { name: /starwarslogo/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /crash system/i })
        ).toBeInTheDocument()
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('calls onSearchChange when searching', () => {
        render(<Header onSearchChange={mockOnSearchChange} />)

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button', { name: /search/i })

        fireEvent.change(input, { target: { value: 'Tatooine' } })
        fireEvent.click(button)

        expect(mockOnSearchChange).toHaveBeenCalledWith('Tatooine')
    })
})
