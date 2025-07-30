// ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import ErrorBoundary from '../components/error/error'

// Компонент, который не выбрасывает ошибку
const GoodComponent = () => <div>Все хорошо</div>

// Компонент, выбрасывающий ошибку при рендере
const BadComponent = () => {
    throw new Error('Test error')
}

describe('ErrorBoundary', () => {
    test('рендерит дочерние компоненты, если ошибки нет', () => {
        render(
            <ErrorBoundary>
                <GoodComponent />
            </ErrorBoundary>
        )
        expect(screen.getByText('Все хорошо')).toBeInTheDocument()
    })

    test('рендерит fallback UI, если произошла ошибка', () => {
        // Подавляем сообщения об ошибке в консоль, чтобы тест не заполнил вывод
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

        render(
            <ErrorBoundary>
                <BadComponent />
            </ErrorBoundary>
        )
        expect(screen.getByText('Something went wrong.')).toBeInTheDocument()

        consoleErrorSpy.mockRestore()
    })
})
