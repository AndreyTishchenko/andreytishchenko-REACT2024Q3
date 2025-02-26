import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ErrorBoundary from '../components/error/error'

const GoodChild = () => <div data-testid="child">All good!</div>

class ProblemChild extends React.Component {
    render(): React.ReactNode {
        throw new Error('Test error')
    }
}

describe('ErrorBoundary component', () => {
    it('renders children when no error is thrown', () => {
        render(
            <ErrorBoundary>
                <GoodChild />
            </ErrorBoundary>
        )
        expect(screen.getByTestId('child')).toHaveTextContent('All good!')
    })

    it('displays fallback UI when a child throws an error', () => {
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})
        render(
            <ErrorBoundary>
                <ProblemChild />
            </ErrorBoundary>
        )
        expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
        consoleErrorSpy.mockRestore()
    })
})
