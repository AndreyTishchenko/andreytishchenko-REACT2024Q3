import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Modal from '../components/Modal'

test('renders in portal and closes on overlay click', () => {
  const onClose = vi.fn()
  render(
    <Modal open title="Test Modal" onClose={onClose}>
      <button>Inside</button>
    </Modal>
  )
  const dialog = screen.getByRole('dialog')
  expect(dialog).toBeInTheDocument()

  fireEvent.mouseDown(dialog.parentElement!)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('esc closes modal', () => {
  const onClose = vi.fn()
  render(
    <Modal open title="Esc Modal" onClose={onClose}>
      <button>Inside</button>
    </Modal>
  )
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(onClose).toHaveBeenCalled()
})
