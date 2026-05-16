import React, { useRef, useState } from 'react'
import { schema, SchemaType } from '../utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, type AppDispatch } from '../store'
import { imageToBase64, isValidImage } from '../utils/image'
import { addEntry } from '../store/slices/entriesSlice'
import { passwordStrength } from '../utils/password'
import type { Gender } from '../types'

type Errors = Partial<Record<keyof SchemaType, string>>
type Draft = {
  name: string
  age: number
  email: string
  password: string
  confirmPassword: string
  gender: Gender
  acceptTnC: boolean
  country: string
  imageBase64: string | null
}

export default function UncontrolledForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch<AppDispatch>()
  const countries = useSelector((s: RootState) => s.countries.list)

  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)
  const cpwRef = useRef<HTMLInputElement>(null)
  const maleRef = useRef<HTMLInputElement>(null)
  const femaleRef = useRef<HTMLInputElement>(null)
  const otherRef = useRef<HTMLInputElement>(null)
  const tncRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)

  const [errors, setErrors] = useState<Errors>({})
  const [pw, setPw] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    let gender: Gender = 'other'
    if (maleRef.current?.checked) gender = 'male'
    else if (femaleRef.current?.checked) gender = 'female'
    else if (otherRef.current?.checked) gender = 'other'

    let imageBase64: string | null = null
    const file = imageRef.current?.files?.[0]
    if (file) {
      const valid = isValidImage(file)
      if (!valid.ok) {
        setErrors(prev => ({ ...prev, imageBase64: valid.reason }))
        return
      }
      imageBase64 = await imageToBase64(file)
    }

    const draft: Draft = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value || 0),
      email: emailRef.current?.value || '',
      password: pwRef.current?.value || '',
      confirmPassword: cpwRef.current?.value || '',
      gender,
      acceptTnC: !!tncRef.current?.checked,
      country: countryRef.current?.value || '',
      imageBase64
    }

    const parsed = schema.safeParse(draft)
    if (!parsed.success) {
      const fieldErrors: Errors = {}
      parsed.error.issues.forEach(i => {
        const key = i.path[0] as keyof SchemaType
        if (!fieldErrors[key]) fieldErrors[key] = i.message
      })
      setErrors(fieldErrors)
      return
    }

    const { confirmPassword, ...rest } = parsed.data
    dispatch(addEntry({ ...rest, source: 'uncontrolled' }))
    onSuccess()
  }

  const strength = passwordStrength(pw)

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name-un">Name</label>
        <input id="name-un" ref={nameRef} name="name" />
        <div className="error-slot">{errors.name}</div>
      </div>

      <div className="field">
        <label htmlFor="age-un">Age</label>
        <input id="age-un" ref={ageRef} name="age" type="number" />
        <div className="error-slot">{errors.age}</div>
      </div>

      <div className="field">
        <label htmlFor="email-un">Email</label>
        <input id="email-un" ref={emailRef} name="email" type="email" />
        <div className="error-slot">{errors.email}</div>
      </div>

      <div className="field">
        <label htmlFor="password-un">Password</label>
        <input id="password-un" ref={pwRef} name="password" type="password" onChange={(e) => setPw(e.target.value)} />
        <div className="help">
          Strength: [
          {strength.hasNumber ? '✓' : '✗'} number,
          {strength.hasUpper ? '✓' : '✗'} upper,
          {strength.hasLower ? '✓' : '✗'} lower,
          {strength.hasSpecial ? '✓' : '✗'} special ]
        </div>
        <div className="error-slot">{errors.password}</div>
      </div>

      <div className="field">
        <label htmlFor="confirmPassword-un">Confirm Password</label>
        <input id="confirmPassword-un" ref={cpwRef} name="confirmPassword" type="password" />
        <div className="error-slot">{errors.confirmPassword}</div>
      </div>

      <div className="field">
        <label>Gender</label>
        <div className="radio-row">
          <label><input ref={maleRef} type="radio" name="gender" value="male" defaultChecked /> Male</label>
          <label><input ref={femaleRef} type="radio" name="gender" value="female" /> Female</label>
          <label><input ref={otherRef} type="radio" name="gender" value="other" /> Other</label>
        </div>
        <div className="error-slot">{errors.gender}</div>
      </div>

      <div className="field">
        <label htmlFor="country-un">Country</label>
        <input id="country-un" ref={countryRef} name="country" list="country-datalist" />
        <datalist id="country-datalist">
          {countries.map(c => <option key={c} value={c} />)}
        </datalist>
        <div className="error-slot">{errors.country}</div>
      </div>

      <div className="field">
        <label htmlFor="image-un">Picture (PNG/JPEG ≤2MB)</label>
        <input id="image-un" ref={imageRef} name="image" type="file" accept="image/png,image/jpeg" />
        <div className="error-slot">{errors.imageBase64}</div>
      </div>

      <div className="field">
        <label htmlFor="tnc-un">
          <input id="tnc-un" ref={tncRef} name="acceptTnC" type="checkbox" /> I accept Terms & Conditions
        </label>
        <div className="error-slot">{errors.acceptTnC}</div>
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
