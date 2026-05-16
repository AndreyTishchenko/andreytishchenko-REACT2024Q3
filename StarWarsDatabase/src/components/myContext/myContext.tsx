import { createContext, useState } from 'react'
import { MyContextType, MyProviderProps } from './types'

export const MyContext = createContext<MyContextType | undefined>(undefined)
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
