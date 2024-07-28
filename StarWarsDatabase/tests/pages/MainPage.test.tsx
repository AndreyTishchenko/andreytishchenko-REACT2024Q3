import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../../src/pages/errorPage'
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
        expect(header).toBeInTheDocument()
    })
})
