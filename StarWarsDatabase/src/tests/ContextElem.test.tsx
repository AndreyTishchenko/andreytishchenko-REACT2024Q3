// src/tests/MyProvider.test.tsx
import React, { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MyProvider, MyContext } from '../components/myContext/myContext'

// A dummy consumer component that uses the MyContext value.
const ConsumerComponent = () => {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error('Context not provided')
    }
    return (
        <div>
            <span data-testid="value">{context.value ? 'true' : 'false'}</span>
            <button onClick={() => context.updateValue(true)}>Set True</button>
            <button onClick={() => context.updateValue(false)}>
                Set False
            </button>
        </div>
    )
}

describe('MyProvider', () => {
    it('provides a default value of false', () => {
        render(
            <MyProvider>
                <ConsumerComponent />
            </MyProvider>
        )
        expect(screen.getByTestId('value')).toHaveTextContent('false')
    })

    it('updates value when updateValue is called', async () => {
        render(
            <MyProvider>
                <ConsumerComponent />
            </MyProvider>
        )

        const setTrueButton = screen.getByText('Set True')
        await userEvent.click(setTrueButton)
        expect(screen.getByTestId('value')).toHaveTextContent('true')

        const setFalseButton = screen.getByText('Set False')
        await userEvent.click(setFalseButton)
        expect(screen.getByTestId('value')).toHaveTextContent('false')
    })
})
