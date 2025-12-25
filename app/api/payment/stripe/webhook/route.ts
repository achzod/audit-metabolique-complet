import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { generatePremiumReport } from '@/lib/reports/generate-premium';
import { sendAuditReport } from '@/lib/email';

// Only initialize Stripe if API key is available
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2024-12-18.acacia' as any })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get audit ID from metadata
      const auditId = session.metadata?.auditId;

      if (!auditId) {
        console.error('No auditId in session metadata');
        return NextResponse.json({ received: true });
      }

      // Get audit with user
      const audit = await prisma.audit.findUnique({
        where: { id: auditId },
        include: { user: true },
      });

      if (!audit) {
        console.error('Audit not found:', auditId);
        return NextResponse.json({ received: true });
      }

      // Generate premium report
      console.log('📄 Generating PREMIUM report for audit:', auditId);
      const premiumReportHtml = await generatePremiumReport({
        userName: audit.user.name || 'User',
        responses: audit.responses as any,
        scores: audit.scores as any,
        aiAnalysis: audit.aiAnalysis as any,
      });

      // Update audit to premium
      await prisma.audit.update({
        where: { id: auditId },
        data: {
          type: 'PREMIUM',
          htmlPremium: premiumReportHtml,
        },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: audit.userId,
          auditId: audit.id,
          amount: (session.amount_total || 0) / 100, // Convert cents to euros
          currency: session.currency?.toUpperCase() || 'EUR',
          provider: 'STRIPE',
          providerPaymentId: session.payment_intent as string,
          status: 'COMPLETED',
          paidAt: new Date(),
        },
      });

      // Send premium report by email
      console.log('📧 Sending PREMIUM report by email...');
      try {
        await sendAuditReport({
          email: audit.user.email,
          name: audit.user.name || 'User',
          auditId: audit.id,
          reportHtml: premiumReportHtml,
          isPremium: true,
        });
        console.log('✅ Premium report sent successfully!');
      } catch (emailError) {
        console.error('⚠️ Failed to send premium email:', emailError);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
