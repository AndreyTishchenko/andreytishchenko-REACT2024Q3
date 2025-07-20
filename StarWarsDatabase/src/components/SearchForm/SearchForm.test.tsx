import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import SearchForm from './Searchform'

// Helper to set up component
const setup = (localStorageValue: string | null = '') => {
    localStorage.setItem('SearchText', localStorageValue ?? '')
    const onSearchChange = vi.fn()
    const utils = render(<SearchForm onSearchChange={onSearchChange} />)
    return {
        ...utils,
        onSearchChange,
    }
}

describe('SearchForm', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('renders with value from localStorage', () => {
        localStorage.setItem('SearchText', 'Tatooine')
        const { getByDisplayValue } = render(
            <SearchForm onSearchChange={vi.fn()} />
        )
        expect(getByDisplayValue('Tatooine')).toBeInTheDocument()
    })

    it('updates state when input changes', () => {
        const { getByRole } = setup()
        const input = getByRole('textbox') as HTMLInputElement
        fireEvent.change(input, { target: { value: 'Alderaan' } })
        expect(input.value).toBe('Alderaan')
    })

    it('calls onSearchChange and sets localStorage on submit', () => {
        const { getByRole, onSearchChange } = setup()
        const input = getByRole('textbox') as HTMLInputElement
        const form = input.closest('form')!

        fireEvent.change(input, { target: { value: 'Dagobah' } })
        fireEvent.submit(form)

        expect(onSearchChange).toHaveBeenCalledWith('Dagobah')
        expect(localStorage.getItem('SearchText')).toBe('Dagobah')
    })
})
