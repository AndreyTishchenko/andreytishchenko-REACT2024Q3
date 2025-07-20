import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer component', () => {
    it('renders a <footer> element', () => {
        render(<Footer />)
        const footer = screen.getByRole('contentinfo') // <footer> has implicit "contentinfo" role
        expect(footer).toBeInTheDocument()
    })

    it('contains a <div> inside the footer', () => {
        render(<Footer />)
        const div = screen.getByRole('contentinfo').querySelector('div')
        expect(div).toBeInTheDocument()
    })
})
