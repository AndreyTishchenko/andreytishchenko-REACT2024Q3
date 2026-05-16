import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SearchForm from '../components/SearchForm/Searchform'
import { MyContext } from '../components/myContext/myContext'

const dummyOnSearchChange = vi.fn()

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
        localStorage.setItem('SearchText', '"SavedSearch"')
        renderWithContext({ value: false, updateValue: vi.fn() })
        const input = screen.getByRole('textbox')

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
        const consoleError = console.error
        console.error = vi.fn()

        expect(() =>
            render(<SearchForm onSearchChange={dummyOnSearchChange} />)
        ).toThrow('Error')

        console.error = consoleError
    })
})
