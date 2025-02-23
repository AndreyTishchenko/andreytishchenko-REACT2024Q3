import { createContext, useState, ReactNode } from 'react'

interface MyContextType {
    value: boolean
    updateValue: (newValue: boolean) => void
}

// Create the context with a default value (optional)
export const MyContext = createContext<MyContextType | undefined>(undefined)

interface MyProviderProps {
    children: ReactNode
}

export const MyProvider = ({ children }: MyProviderProps) => {
    const [value, setValue] = useState(false)

    const updateValue = (newValue: boolean) => {
        setValue(newValue)
    }

    return (
        <MyContext.Provider value={{ value, updateValue }}>
            {children}
        </MyContext.Provider>
    )
}
