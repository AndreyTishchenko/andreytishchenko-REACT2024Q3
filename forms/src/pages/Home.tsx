import { useState } from 'react'
import Modal from '../components/Modal'
import HookForm from '../forms/HookForm'
import UncontrolledForm from '../forms/UncontrolledForm'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import Tile from '../components/Tile'

export default function Home() {
  const [open, setOpen] = useState<null | 'un' | 'rhf'>(null)
  const entries = useSelector((s: RootState) => s.entries.items)
  const recentId = useSelector((s: RootState) => s.entries.recentlyAddedId)

  return (
    <main className="container">
      <h1>Forms Test Task</h1>
      <p>Two modals via React Portals. One uses uncontrolled inputs, the other uses React Hook Form + Zod.</p>

      <div className="btn-row">
        <button onClick={() => setOpen('un')} aria-haspopup="dialog" aria-controls="modal">Open Uncontrolled Form</button>
        <button onClick={() => setOpen('rhf')} aria-haspopup="dialog" aria-controls="modal">Open RHF Form</button>
      </div>

      <section>
        <h2>Submissions</h2>
        {entries.length === 0 && <p>No entries yet. Submit a form!</p>}
        <div className="grid">
          {entries.map((e) => (
            <Tile key={e.id} entry={e} isRecent={recentId === e.id} />
          ))}
        </div>
      </section>

      <Modal
        open={open === 'un'}
        title="Uncontrolled Form"
        onClose={() => setOpen(null)}
      >
        <UncontrolledForm onSuccess={() => setOpen(null)} />
      </Modal>

      <Modal
        open={open === 'rhf'}
        title="React Hook Form"
        onClose={() => setOpen(null)}
      >
        <HookForm onSuccess={() => setOpen(null)} />
      </Modal>
    </main>
  )
}
