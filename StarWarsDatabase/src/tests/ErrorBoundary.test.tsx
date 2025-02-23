// src/tests/ErrorBoundary.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ErrorBoundary from '../components/error/error'

// A dummy component that renders normally.
const GoodChild = () => <div data-testid="child">All good!</div>

// A dummy component that throws an error during rendering.
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
        // Verify that the child content is rendered.
        expect(screen.getByTestId('child')).toHaveTextContent('All good!')
    })

    it('displays fallback UI when a child throws an error', () => {
        // Suppress error logging to keep test output clean.
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})
        render(
            <ErrorBoundary>
                <ProblemChild />
            </ErrorBoundary>
        )
        // Verify that the fallback UI is rendered.
        expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
        consoleErrorSpy.mockRestore()
    })
})
