import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, SchemaType } from '../utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import { addEntry } from '../store/slices/entriesSlice'
import { RootState } from '../store'
import { imageToBase64, isValidImage } from '../utils/image'
import { passwordStrength } from '../utils/password'
import Autocomplete from '../components/Autocomplete'

export default function HookForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch()
  const countries = useSelector((s: RootState) => s.countries.list)

  const { register, handleSubmit, control, formState: { errors, isValid }, setValue, watch } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '', age: 0, email: '',
      password: '', confirmPassword: '',
      gender: 'male', acceptTnC: false, country: '', imageBase64: null
    }
  })

  const onSubmit = (data: SchemaType) => {
    dispatch(addEntry({ ...data, source: 'react-hook-form' }))
    onSuccess()
  }

  const pw = watch('password')
  const strength = passwordStrength(pw)

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="name-rhf">Name</label>
        <input id="name-rhf" {...register('name')} />
        <div className="error-slot">{errors.name?.message}</div>
      </div>

      <div className="field">
        <label htmlFor="age-rhf">Age</label>
        <input id="age-rhf" type="number" {...register('age', { valueAsNumber: true })} />
        <div className="error-slot">{errors.age?.message}</div>
      </div>

      <div className="field">
        <label htmlFor="email-rhf">Email</label>
        <input id="email-rhf" type="email" {...register('email')} />
        <div className="error-slot">{errors.email?.message}</div>
      </div>

      <div className="field">
        <label htmlFor="password-rhf">Password</label>
        <input id="password-rhf" type="password" {...register('password')} />
        <div className="help">
          Strength: [
          {strength.hasNumber ? '✓' : '✗'} number,
          {strength.hasUpper ? '✓' : '✗'} upper,
          {strength.hasLower ? '✓' : '✗'} lower,
          {strength.hasSpecial ? '✓' : '✗'} special ]
        </div>
        <div className="error-slot">{errors.password?.message}</div>
      </div>

      <div className="field">
        <label htmlFor="confirmPassword-rhf">Confirm Password</label>
        <input id="confirmPassword-rhf" type="password" {...register('confirmPassword')} />
        <div className="error-slot">{errors.confirmPassword?.message}</div>
      </div>

      <div className="field">
        <label>Gender</label>
        <div className="radio-row">
          <label><input type="radio" value="male" {...register('gender')} /> Male</label>
          <label><input type="radio" value="female" {...register('gender')} /> Female</label>
          <label><input type="radio" value="other" {...register('gender')} /> Other</label>
        </div>
        <div className="error-slot">{errors.gender?.message}</div>
      </div>

      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <Autocomplete
            countries={countries}
            value={field.value}
            onChange={(v) => field.onChange(v)}
            label="Country"
            name="country-rhf"
            error={errors.country?.message}
          />
        )}
      />

      <div className="field">
        <label htmlFor="image-rhf">Picture (PNG/JPEG ≤2MB)</label>
        <input
          id="image-rhf"
          type="file"
          accept="image/png,image/jpeg"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            const valid = isValidImage(file)
            if (!valid.ok) {
              alert(valid.reason)
              setValue('imageBase64', null)
              return
            }
            const b64 = await imageToBase64(file)
            setValue('imageBase64', b64, { shouldValidate: true })
          }}
        />
        <div className="error-slot">{/* image errors handled above */}</div>
      </div>

      <div className="field">
        <label htmlFor="tnc-rhf">
          <input id="tnc-rhf" type="checkbox" {...register('acceptTnC')} /> I accept Terms & Conditions
        </label>
        <div className="error-slot">{errors.acceptTnC?.message}</div>
      </div>

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  )
}
