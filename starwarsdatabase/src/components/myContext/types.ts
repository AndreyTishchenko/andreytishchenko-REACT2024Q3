import { ReactNode } from 'react'

export interface MyContextType {
    value: boolean
    updateValue: (newValue: boolean) => void
}

export interface MyProviderProps {
    children: ReactNode
}
