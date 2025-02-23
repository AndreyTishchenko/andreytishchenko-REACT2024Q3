// src/tests/Footer.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../components/footer/Footer' // adjust the path if necessary

describe('Footer component', () => {
    it('renders a footer element', () => {
        render(<Footer />)
        // footer elements are given a default "contentinfo" role by browsers
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
