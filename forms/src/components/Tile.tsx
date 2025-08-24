import React, { useEffect, useState } from 'react'
import { Entry } from '../types'
import { useDispatch } from 'react-redux'
import { clearRecent } from '../store/slices/entriesSlice'

export default function Tile({ entry, isRecent }: { entry: Entry; isRecent: boolean }) {
  const dispatch = useDispatch()
  const [flash, setFlash] = useState(isRecent)

  useEffect(() => {
    if (isRecent) {
      const t = setTimeout(() => {
        setFlash(false)
        dispatch(clearRecent())
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [isRecent, dispatch])

  return (
    <div className={['tile', flash ? 'flash' : ''].join(' ')} aria-live="polite">
      {entry.imageBase64 && (
        <img src={entry.imageBase64} alt={`${entry.name}'s avatar`} className="tile-img" />
      )}
      <div className="tile-body">
        <div><strong>Name:</strong> {entry.name}</div>
        <div><strong>Age:</strong> {entry.age}</div>
        <div><strong>Email:</strong> {entry.email}</div>
        <div><strong>Gender:</strong> {entry.gender}</div>
        <div><strong>Country:</strong> {entry.country}</div>
        <div className="source-badge">{entry.source}</div>
      </div>
    </div>
  )
}
