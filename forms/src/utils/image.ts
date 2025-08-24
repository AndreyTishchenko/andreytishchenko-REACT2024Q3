export function isValidImage(file: File): { ok: boolean; reason?: string } {
  const allowed = ['image/png', 'image/jpeg']
  const maxBytes = 2 * 1024 * 1024
  if (!allowed.includes(file.type)) return { ok: false, reason: 'Only PNG or JPEG allowed' }
  if (file.size > maxBytes) return { ok: false, reason: 'Image size must be ≤ 2MB' }
  return { ok: true }
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}
