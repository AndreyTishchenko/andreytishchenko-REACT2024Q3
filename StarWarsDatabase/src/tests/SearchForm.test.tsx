// SearchForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchForm from '../components/SearchForm/Searchform'
import { MyContext } from '../components/myContext/myContext'

// Dummy onSearchChange callback to pass as prop
const dummyOnSearchChange = vi.fn()

// Helper to render SearchForm wrapped in MyContext.Provider
const renderWithContext = (
    contextValue: {
        value: boolean
        updateValue: (newValue: boolean) => void
    } = { value: false, updateValue: vi.fn() }
) => {
    return render(
        <MyContext.Provider value={contextValue}>
            <SearchForm onSearchChange={dummyOnSearchChange} />
        </MyContext.Provider>
    )
}

describe('SearchForm component', () => {
    beforeEach(() => {
        localStorage.clear()
        dummyOnSearchChange.mockReset()
    })

    it('renders with an empty search text if localStorage is empty', () => {
        renderWithContext({ value: false, updateValue: vi.fn() })
        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('')
        expect(input).toHaveClass('SearchInput')

        const button = screen.getByRole('button')
        expect(button).toHaveClass('SubmitInput')
        expect(button).not.toHaveClass('light')
    })

    it('loads saved search text from localStorage', async () => {
        // Save a value in localStorage wrapped in quotes as expected by the component
        localStorage.setItem('SearchText', '"SavedSearch"')
        renderWithContext({ value: false, updateValue: vi.fn() })
        const input = screen.getByRole('textbox')

        // Wait for useEffect to update the state
        await waitFor(() => expect(input).toHaveValue('SavedSearch'))
    })

    it('updates the input value on change', () => {
        renderWithContext({ value: false, updateValue: vi.fn() })
        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: 'New Query' } })
        expect(input).toHaveValue('New Query')
    })

    it('calls onSearchChange and updates localStorage on form submit', () => {
        renderWithContext({ value: false, updateValue: vi.fn() })
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'Test Search' } })

        // Retrieve the form element and simulate form submission
        const formElement = document.querySelector('form')
        if (!formElement) throw new Error('Form not found')
        fireEvent.submit(formElement)

        expect(localStorage.getItem('SearchText')).toBe('Test Search')
        expect(dummyOnSearchChange).toHaveBeenCalledWith('Test Search')
    })

    it('applies "light" class when context.value is true', () => {
        renderWithContext({ value: true, updateValue: vi.fn() })
        const input = screen.getByRole('textbox')
        expect(input).toHaveClass('SearchInput light')

        const button = screen.getByRole('button')
        expect(button).toHaveClass('SubmitInput light')
    })

    it('throws an error if context is not provided', () => {
        // Suppress console.error to keep test output clean
        const consoleError = console.error
        console.error = vi.fn()

        expect(() =>
            render(<SearchForm onSearchChange={dummyOnSearchChange} />)
        ).toThrow('Error')

        console.error = consoleError
    })
})
