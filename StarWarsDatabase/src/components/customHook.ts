import { useEffect } from 'react'

export default function useCudsomHook(value: string) {
    useEffect(() => {
        localStorage.setItem('SearchText', value)
    })
}
