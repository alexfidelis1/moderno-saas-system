import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

// Usuário administrador pré-configurado
const ADMIN_USER = {
  username: 'afsantos',
  password: 'fidelis123', // Em produção, use hash bcrypt
  email: 'fidelis.alex@gmail.com',
  role: 'administrator'
}

// Chave secreta para JWT (em produção, use variável de ambiente)
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sua-chave-secreta-super-segura-aqui-2025'
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validação simples
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuário e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar credenciais
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      // Gerar token JWT
      const token = await new SignJWT({
        username: ADMIN_USER.username,
        email: ADMIN_USER.email,
        role: ADMIN_USER.role
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(SECRET_KEY)

      return NextResponse.json({
        success: true,
        token,
        user: {
          username: ADMIN_USER.username,
          email: ADMIN_USER.email,
          role: ADMIN_USER.role
        }
      })
    }

    // Credenciais inválidas
    return NextResponse.json(
      { error: 'Usuário ou senha incorretos' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
