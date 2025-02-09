import { useEffect, useState } from 'react'

export default function useSearchQuery(key: string, initialValue = '') {
    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState(() => {
        // Try to get the search query from local storage
        const storedQuery = localStorage.getItem(key)
        // If a stored query exists, parse and return it, otherwise return the initial value
        return storedQuery ? JSON.parse(storedQuery) : initialValue
    })

    // Effect to update local storage whenever the search query changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(searchQuery))
    }, [key, searchQuery])

    // Return the search query and the function to update it
    return [searchQuery, setSearchQuery]
}
