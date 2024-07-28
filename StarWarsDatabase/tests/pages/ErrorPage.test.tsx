import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import ErrorPage from '../../src/pages/errorPage'
describe('group', () => {
    it('should', () => {
        render(<ErrorPage />)
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
    })
})
