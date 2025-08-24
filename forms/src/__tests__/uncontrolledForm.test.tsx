import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../store'
import UncontrolledForm from '../forms/UncontrolledForm'

async function trySubmit() {
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
}

test('Uncontrolled shows errors on submit', async () => {
  const onSuccess = vi.fn()
  render(<Provider store={store}><UncontrolledForm onSuccess={onSuccess} /></Provider>)
  await trySubmit()
  expect(screen.getByText(/name is required/i)).toBeInTheDocument()
})

test('Uncontrolled accepts valid input and calls onSuccess', async () => {
  const onSuccess = vi.fn()
  render(<Provider store={store}><UncontrolledForm onSuccess={onSuccess} /></Provider>)

  await userEvent.type(screen.getByLabelText(/name/i), 'Alice')
  await userEvent.type(screen.getByLabelText(/age/i), '28')
  await userEvent.type(screen.getByLabelText(/email/i), 'a@a.com')
  await userEvent.type(screen.getByLabelText(/^Password$/i), 'Aa1!aaaa')
  await userEvent.type(screen.getByLabelText(/confirm password/i), 'Aa1!aaaa')
  await userEvent.click(screen.getByRole('radio', { name: /^Male$/i }))
  await userEvent.type(screen.getByLabelText(/country/i), 'Germany')
  await userEvent.click(screen.getByLabelText(/terms/i))
  await trySubmit()
})
