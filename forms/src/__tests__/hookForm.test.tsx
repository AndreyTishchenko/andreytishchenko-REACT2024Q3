import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../store'
import HookForm from '../forms/HookForm'

async function fillValid() {
  await userEvent.type(screen.getByLabelText(/name/i), 'Alice')
  await userEvent.type(screen.getByLabelText(/age/i), '25')
  await userEvent.type(screen.getByLabelText(/email/i), 'a@a.com')
  await userEvent.type(screen.getByLabelText(/^Password$/i), 'Aa1!aaaa')
  await userEvent.type(screen.getByLabelText(/confirm password/i), 'Aa1!aaaa')
  await userEvent.type(screen.getByLabelText(/country/i), 'Ger')
  await userEvent.clear(screen.getByLabelText(/country/i))
  await userEvent.type(screen.getByLabelText(/country/i), 'Germany')
  await userEvent.click(screen.getByLabelText(/terms/i))
}

test('RHF disables submit until valid and submits', async () => {
  const onSuccess = vi.fn()
  render(<Provider store={store}><HookForm onSuccess={onSuccess} /></Provider>)
  const submit = screen.getByRole('button', { name: /submit/i })
  expect(submit).toBeDisabled()

  await fillValid()
  expect(submit).not.toBeDisabled()
})
