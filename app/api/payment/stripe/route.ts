import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  // Initialize Stripe inside the function to avoid build-time errors
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia',
  })

  try {
    const { plan, responses } = await request.json()

    if (plan !== 'PREMIUM') {
      return NextResponse.json(
        { error: 'Le paiement est requis uniquement pour la version premium' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Audit Métabolique Premium',
              description: '15 sections d\'analyse complète + Plan personnalisé 90 jours',
            },
            unit_amount: 7900, // 79€ in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup?plan=PREMIUM&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout`,
      metadata: {
        plan: 'PREMIUM',
        responses: JSON.stringify(responses),
      },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (error) {
    console.error('Stripe session creation error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    )
  }
}
