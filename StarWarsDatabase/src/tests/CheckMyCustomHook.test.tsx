import { renderHook, act } from '@testing-library/react'
import useSearchQuery from '../hooks/myCustomHook'

describe('useSearchQuery Hook', () => {
    const STORAGE_KEY = 'testQuery'

    beforeEach(() => {
        localStorage.clear() // Ensure fresh storage before each test
    })

    test('initializes with default value if localStorage is empty', () => {
        const { result } = renderHook(() =>
            useSearchQuery(STORAGE_KEY, 'default')
        )

        expect(result.current[0]).toBe('default')
    })

    test('retrieves value from localStorage if available', () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify('savedQuery'))

        const { result } = renderHook(() => useSearchQuery(STORAGE_KEY))

        expect(result.current[0]).toBe('savedQuery')
    })

    test('updates localStorage when searchQuery changes', () => {
        const { result } = renderHook(() => useSearchQuery(STORAGE_KEY))

        act(() => {
            result.current[1]('newSearch')
        })

        expect(localStorage.getItem(STORAGE_KEY)).toBe(
            JSON.stringify('newSearch')
        )
        expect(result.current[0]).toBe('newSearch')
    })

    test('persists search query across re-renders', () => {
        const { result, rerender } = renderHook(() =>
            useSearchQuery(STORAGE_KEY)
        )

        act(() => {
            result.current[1]('persistentSearch')
        })

        rerender()

        expect(result.current[0]).toBe('persistentSearch')
    })
})
