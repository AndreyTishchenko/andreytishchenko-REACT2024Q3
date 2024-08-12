import { render, screen } from '@testing-library/react'
import Footer from '../../src/components/footer/Footer'
import '@testing-library/jest-dom/vitest'
import { describe, expect, it } from 'vitest'
import React from 'react'
describe('group', () => {
    it('should', () => {
        render(<Footer />)
        const paragraph: HTMLElement = screen.getByRole('paragraph')
        expect(paragraph).toBeInTheDocument()
        expect(paragraph).toHaveTextContent(/andrew tishchenko/i)
    })
})
