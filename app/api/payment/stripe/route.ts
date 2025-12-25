import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'Stripe non configuré' },
      { status: 500 }
    )
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-12-18.acacia' as any,
  })

  try {
    const { plan, email, responses } = await request.json()

    if (!['PREMIUM', 'ELITE'].includes(plan)) {
      return NextResponse.json(
        { error: 'Plan invalide' },
        { status: 400 }
      )
    }

    const prices = {
      PREMIUM: {
        amount: 7900, // 79€ in cents
        name: 'Audit Métabolique Premium',
        description: '11 sections d\'analyse complète + Plan personnalisé',
      },
      ELITE: {
        amount: 12900, // 129€ in cents
        name: 'Audit Métabolique Elite',
        description: '13 sections complètes + Analyse photos + Mises à jour 1 an',
      },
    }

    const selectedPrice = prices[plan as keyof typeof prices]

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: selectedPrice.name,
              description: selectedPrice.description,
            },
            unit_amount: selectedPrice.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout`,
      metadata: {
        plan,
        email,
        responses: JSON.stringify(responses).slice(0, 500), // Stripe metadata limit
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
