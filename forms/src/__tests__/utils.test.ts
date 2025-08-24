import { passwordStrength, isStrong } from '../utils/password'
import { imageToBase64, isValidImage } from '../utils/image'
import { schema } from '../utils/validation'

test('password strength', () => {
  const s = passwordStrength('Abcdef1!')
  expect(s.hasNumber && s.hasUpper && s.hasLower && s.hasSpecial).toBe(true)
  expect(isStrong('Abcdef1!')).toBe(true)
})

test('image validation', () => {
  const file = new File(['aaa'], 'a.png', { type: 'image/png' })
  expect(isValidImage(file).ok).toBe(true)
  const big = new File([new ArrayBuffer(3*1024*1024)], 'b.png', { type: 'image/png' })
  expect(isValidImage(big).ok).toBe(false)
})

test('imageToBase64 returns a data url', async () => {
  const file = new File(['hi'], 'x.png', { type: 'image/png' })
  const b64 = await imageToBase64(file)
  expect(b64.startsWith('data:image/png;base64')).toBe(true)
})

test('zod validation passes & fails', () => {
  const ok = {
    name: 'Alice', age: 22, email: 'a@a.com',
    password: 'Aa1!aaaa', confirmPassword: 'Aa1!aaaa',
    gender: 'female', acceptTnC: true, country: 'Germany', imageBase64: null
  }
  expect(schema.safeParse(ok).success).toBe(true)

  const bad = { ...ok, name: 'alice' }
  expect(schema.safeParse(bad).success).toBe(false)
})
