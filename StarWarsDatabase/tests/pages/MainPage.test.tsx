import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../../src/pages/MainPage'
describe('group', () => {
    it('should', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />}></Route>
                </Routes>
            </BrowserRouter>
        )
        const header: HTMLElement = screen.getByRole('header')
        const main: HTMLElement = screen.getByRole('main')
        const footer: HTMLElement = screen.getByRole('footer')
        expect(header).toBeInTheDocument()
        expect(main).toBeInTheDocument()
        expect(footer).toBeInTheDocument()
    })
})
