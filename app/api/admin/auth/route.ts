import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // Admin password from env (fallback to default for testing)
    const adminPassword = process.env.ADMIN_PASSWORD || 'achzod2024'

    if (password === adminPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Mot de passe incorrect' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
