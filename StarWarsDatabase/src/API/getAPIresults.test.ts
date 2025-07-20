import { describe, it, expect, vi, beforeEach } from 'vitest'
import getAPIresults from './api'

describe('getAPIresults', () => {
    beforeEach(() => {
        vi.restoreAllMocks() // resets mocks between tests
    })

    it('returns JSON when fetch is successful', async () => {
        const mockJson = { results: [{ name: 'Tatooine' }] }

        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockJson),
                } as Response)
            )
        )

        const result = await getAPIresults('tatooine', 5)

        expect(fetch).toHaveBeenCalledWith(
            'https://swapi.dev/api/planets/?search=tatooine&limit=5&page=1'
        )
        expect(result).toEqual(mockJson)
    })

    it('returns error message when fetch fails', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: false,
                } as Response)
            )
        )

        const result = await getAPIresults('dagobah', 3)

        expect(result).toBe('something went wrong')
    })

    it('handles fetch rejection', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.reject(new Error('Network error')))
        )

        // You might want to wrap this in try/catch depending on your function behavior
        await expect(getAPIresults('alderaan', 2)).rejects.toThrow(
            'Network error'
        )
    })
})
