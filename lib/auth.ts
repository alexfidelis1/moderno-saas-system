import { jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sua-chave-secreta-super-segura-aqui-2025'
)

export interface TokenPayload {
  username: string
  email: string
  role: string
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return payload as TokenPayload
  } catch (error) {
    console.error('Token inválido:', error)
    return null
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false

  const token = localStorage.getItem('auth_token')
  return !!token
}

export function getUser(): TokenPayload | null {
  if (typeof window === 'undefined') return null

  const userStr = localStorage.getItem('user')
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function logout() {
  if (typeof window === 'undefined') return

  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
  window.location.href = '/login'
}
