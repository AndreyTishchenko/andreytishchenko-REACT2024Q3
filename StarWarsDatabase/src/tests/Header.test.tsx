import React, { Component } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from '../components/header/Header'
import { MyContext } from '../components/myContext/myContext'

const dummyOnSearchChange = vi.fn()

const renderWithContext = (contextValue: {
    value: boolean
    updateValue: (newValue: boolean) => void
}) => {
    return render(
        <MyContext.Provider value={contextValue}>
            <Header onSearchChange={dummyOnSearchChange} />
        </MyContext.Provider>
    )
}

class ErrorBoundary extends Component<
    { children: React.ReactNode },
    { error: Error | null }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props)
        this.state = { error: null }
    }
    static getDerivedStateFromError(error: Error) {
        return { error }
    }
    render() {
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>
        }
        return this.props.children
    }
}

describe('Header component', () => {
    it('отображается корректно при context.value = false', () => {
        const mockContext = { value: false, updateValue: vi.fn() }
        renderWithContext(mockContext)

        const header = screen.getByRole('banner')
        expect(header).toBeInTheDocument()
        expect(header).not.toHaveClass('Light')

        const logo = screen.getByAltText('starWarsLogo')
        expect(logo).toBeInTheDocument()

        const toggleButton = screen.getByText('Sith')
        expect(toggleButton).toBeInTheDocument()

        const crashButton = screen.getByText('Crash System')
        expect(crashButton).toBeInTheDocument()
    })

    it('отображается корректно при context.value = true', () => {
        const mockContext = { value: true, updateValue: vi.fn() }
        renderWithContext(mockContext)

        const header = screen.getByRole('banner')
        expect(header).toHaveClass('Light')

        expect(screen.getByText('Jedi')).toBeInTheDocument()
    })

    it('вызывает updateValue при клике на кнопку переключения', () => {
        const updateValueMock = vi.fn()
        const mockContext = { value: false, updateValue: updateValueMock }
        renderWithContext(mockContext)

        const toggleButton = screen.getByText('Sith')
        fireEvent.click(toggleButton)
        expect(updateValueMock).toHaveBeenCalledWith(true)
    })

    it('выбрасывает ошибку при клике на кнопку "Crash System"', () => {
        const mockContext = { value: false, updateValue: vi.fn() }
        render(
            <MyContext.Provider value={mockContext}>
                <ErrorBoundary>
                    <Header onSearchChange={dummyOnSearchChange} />
                </ErrorBoundary>
            </MyContext.Provider>
        )

        const crashButton = screen.getByText('Crash System')
        fireEvent.click(crashButton)

        expect(
            screen.getByText(/Error: Throw error by button/)
        ).toBeInTheDocument()
    })

    it('выбрасывает ошибку, если контекст не предоставлен', () => {
        expect(() =>
            render(<Header onSearchChange={dummyOnSearchChange} />)
        ).toThrow('Error')
    })
})
