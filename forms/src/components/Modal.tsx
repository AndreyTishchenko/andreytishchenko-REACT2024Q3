import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLDivElement>, onClose: () => void) {
  const lastActive = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if (!active) return
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === 'Tab' && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const current = document.activeElement as HTMLElement
        if (e.shiftKey) {
          if (current === first || !containerRef.current.contains(current)) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (current === last || !containerRef.current.contains(current)) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }
    if (active) {
      lastActive.current = document.activeElement as HTMLElement
      const first = containerRef.current?.querySelector<HTMLElement>(
        'input, select, textarea, button, [tabindex]:not([tabindex="-1"])'
      )
      first?.focus()
      document.addEventListener('keydown', keydown, true)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', keydown, true)
      document.body.style.overflow = ''
      lastActive.current?.focus()
    }
  }, [active, containerRef, onClose])
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  useFocusTrap(open, panelRef, onClose)

  if (!open) return null
  return createPortal(
    <div
      ref={overlayRef}
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      aria-hidden={!open}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal-panel"
        ref={panelRef}
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button aria-label="Close" onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  )
}
