import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import App from '../src/App'
describe('group', () => {
    it('should', () => {
        render(<App />)
        const MainPage = screen.getByRole('mainPage');
        expect(MainPage).toBeInTheDocument();
    })
})