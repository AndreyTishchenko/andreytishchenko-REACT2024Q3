import { render, screen } from '@testing-library/react'
import MainPage from './MainPage'
import { describe, expect, it } from 'vitest'

describe('MainPage', () => {
    it('renders header, main and footer', () => {
        render(<MainPage />)

        // Logo or form from Header
        expect(screen.getByAltText(/starWarsLogo/i)).toBeInTheDocument()

        // Fallback loading or "Something went wrong" from Main
        expect(
            screen.getByText(/loading|something went wrong/i)
        ).toBeInTheDocument()

        // Footer
        expect(document.querySelector('footer')).toBeInTheDocument()
    })
})
