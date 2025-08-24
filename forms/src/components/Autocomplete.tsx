import { useMemo, useState } from 'react'

export function filterCountries(countries: string[], query: string): string[] {
  const q = query.toLowerCase().trim()
  return countries.filter(c => c.toLowerCase().includes(q)).slice(0, 8)
}

interface Props {
  countries: string[]
  value: string
  onChange: (val: string) => void
  label: string
  name?: string
  error?: string
}

export default function Autocomplete({ countries, value, onChange, label, name, error }: Props) {
  const [open, setOpen] = useState(false)
  const suggestions = useMemo(() => filterCountries(countries, value), [countries, value])

  return (
    <div className="field">
      <label htmlFor={name || 'country'}>{label}</label>
      <input
        id={name || 'country'}
        name={name}
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true) }}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        aria-autocomplete="list"
        aria-controls="country-listbox"
        aria-expanded={open}
        autoComplete="off"
      />
      <div className="error-slot">{error || ''}</div>
      {open && suggestions.length > 0 && (
        <ul role="listbox" id="country-listbox" className="autocomplete-list">
          {suggestions.map(s => (
            <li
              role="option"
              key={s}
              onMouseDown={(e) => { e.preventDefault(); onChange(s); setOpen(false) }}
              tabIndex={-1}
            >{s}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
