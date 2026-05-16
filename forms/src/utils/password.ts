export type Strength = {
  hasNumber: boolean
  hasUpper: boolean
  hasLower: boolean
  hasSpecial: boolean
}

export function passwordStrength(pw: string): Strength {
  return {
    hasNumber: /\d/.test(pw),
    hasUpper: /[A-Z]/.test(pw),
    hasLower: /[a-z]/.test(pw),
    hasSpecial: /[^A-Za-z0-9]/.test(pw)
  }
}

export function isStrong(pw: string): boolean {
  const s = passwordStrength(pw)
  return s.hasNumber && s.hasUpper && s.hasLower && s.hasSpecial
}
