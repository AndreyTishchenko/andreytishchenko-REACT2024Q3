// Header.test.tsx
import React, { Component } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from '../components/header/Header'
import { MyContext } from '../components/myContext/myContext'

// Заглушка для функции onSearchChange, передаваемой через пропсы
const dummyOnSearchChange = vi.fn()

// Вспомогательная функция для рендера компонента с заданным значением контекста
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

// Простой ErrorBoundary для перехвата ошибок, выбрасываемых компонентом Header
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

        // Проверяем, что элемент header существует и не имеет класса "Light"
        const header = screen.getByRole('banner')
        expect(header).toBeInTheDocument()
        expect(header).not.toHaveClass('Light')

        // Проверяем наличие картинки с alt-текстом
        const logo = screen.getByAltText('starWarsLogo')
        expect(logo).toBeInTheDocument()

        // Кнопка переключения должна отображать "Sith", если context.value = false
        const toggleButton = screen.getByText('Sith')
        expect(toggleButton).toBeInTheDocument()

        // Проверяем, что кнопка "Crash System" отображается
        const crashButton = screen.getByText('Crash System')
        expect(crashButton).toBeInTheDocument()
    })

    it('отображается корректно при context.value = true', () => {
        const mockContext = { value: true, updateValue: vi.fn() }
        renderWithContext(mockContext)

        const header = screen.getByRole('banner')
        // При value = true header должен иметь класс "Light"
        expect(header).toHaveClass('Light')

        // Кнопка переключения должна отображать "Jedi"
        expect(screen.getByText('Jedi')).toBeInTheDocument()
    })

    it('вызывает updateValue при клике на кнопку переключения', () => {
        const updateValueMock = vi.fn()
        const mockContext = { value: false, updateValue: updateValueMock }
        renderWithContext(mockContext)

        // При клике на кнопку, которая отображает "Sith", должно вызываться updateValue с true
        const toggleButton = screen.getByText('Sith')
        fireEvent.click(toggleButton)
        expect(updateValueMock).toHaveBeenCalledWith(true)
    })

    it('выбрасывает ошибку при клике на кнопку "Crash System"', () => {
        const mockContext = { value: false, updateValue: vi.fn() }
        // Оборачиваем Header в ErrorBoundary для перехвата ошибки
        render(
            <MyContext.Provider value={mockContext}>
                <ErrorBoundary>
                    <Header onSearchChange={dummyOnSearchChange} />
                </ErrorBoundary>
            </MyContext.Provider>
        )

        // Клик по кнопке "Crash System"
        const crashButton = screen.getByText('Crash System')
        fireEvent.click(crashButton)

        // Проверяем, что ErrorBoundary отобразил сообщение об ошибке
        expect(
            screen.getByText(/Error: Throw error by button/)
        ).toBeInTheDocument()
    })

    it('выбрасывает ошибку, если контекст не предоставлен', () => {
        // Если контекст не предоставлен, Header должен выбросить ошибку
        expect(() =>
            render(<Header onSearchChange={dummyOnSearchChange} />)
        ).toThrow('Error')
    })
})
