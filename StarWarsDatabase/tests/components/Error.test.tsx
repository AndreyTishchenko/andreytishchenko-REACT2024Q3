import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../../src/components/error/error'
import '@testing-library/jest-dom/vitest'
const Child = () => {
    throw new Error()
}
describe('group', () => {
    it('should', () => {
        render(<>
        <ErrorBoundary>
            <Child />
        </ErrorBoundary>
        </>)
        const heading: HTMLElement = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent(/Something went wrong./i)
    })
})
