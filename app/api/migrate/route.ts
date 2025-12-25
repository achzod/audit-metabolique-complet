import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const maxDuration = 300 // 5 minutes max

export async function POST(request: Request) {
  try {
    // Simple auth check
    const { secret } = await request.json()

    if (secret !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Run prisma db push with longer timeout
    const { stdout, stderr } = await execAsync(
      'npx prisma db push --accept-data-loss --skip-generate',
      { timeout: 60000 } // 60 seconds timeout
    )

    return NextResponse.json({
      success: true,
      stdout,
      stderr,
      message: 'Database migration completed'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stdout: error.stdout,
      stderr: error.stderr
    }, { status: 500 })
  }
}
