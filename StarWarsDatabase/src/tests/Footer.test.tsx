import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../components/footer/Footer'

describe('Footer component', () => {
    it('renders a footer element', () => {
        render(<Footer />)
        const footerElement = screen.getByRole('contentinfo')
        expect(footerElement).toBeInTheDocument()
    })

    it('contains a div element inside the footer', () => {
        render(<Footer />)
        const footerElement = screen.getByRole('contentinfo')
        const divElement = footerElement.querySelector('div')
        expect(divElement).toBeInTheDocument()
    })
})
