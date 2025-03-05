import { useEffect, useState } from 'react'

export default function useSearchQuery(key: string, initialValue = '') {
    const [searchQuery, setSearchQuery] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedQuery = localStorage.getItem(key)
            return storedQuery ? JSON.parse(storedQuery) : initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(searchQuery))
    }, [key, searchQuery])

    return [searchQuery, setSearchQuery]
}
