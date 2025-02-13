import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchForm from '../components/SearchForm/Searchform'

describe('SearchForm', () => {
    const mockOnSearchChange = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('renders input and button correctly', () => {
        render(<SearchForm onSearchChange={mockOnSearchChange} />)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /search/i })
        ).toBeInTheDocument()
    })

    it('loads search text from localStorage on mount', () => {
        localStorage.setItem('SearchText', 'Mars')

        render(<SearchForm onSearchChange={mockOnSearchChange} />)

        expect(screen.getByRole('textbox')).toHaveValue('Mars')
    })

    it('updates input value on change', () => {
        render(<SearchForm onSearchChange={mockOnSearchChange} />)

        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: 'Jupiter' } })

        expect(input).toHaveValue('Jupiter')
    })

    it('calls onSearchChange and saves input value to localStorage on submit', () => {
        render(<SearchForm onSearchChange={mockOnSearchChange} />)

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button', { name: /search/i })

        fireEvent.change(input, { target: { value: 'Saturn' } })
        fireEvent.click(button)

        expect(mockOnSearchChange).toHaveBeenCalledWith('Saturn')
        expect(localStorage.getItem('SearchText')).toBe('Saturn')
    })
})
