import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  // Initialize Stripe inside the function to avoid build-time errors
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia',
  })

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Get user and audit IDs from metadata
      const userId = session.metadata?.userId
      const auditId = session.metadata?.auditId

      if (userId && auditId) {
        // Update payment record
        await prisma.payment.updateMany({
          where: { auditId },
          data: {
            status: 'COMPLETED',
            stripePaymentId: session.payment_intent as string,
          },
        })

        // Update audit version to premium
        await prisma.audit.update({
          where: { id: auditId },
          data: { version: 'PREMIUM' },
        })
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}
