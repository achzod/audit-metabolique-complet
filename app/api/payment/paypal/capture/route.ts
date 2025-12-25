import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePremiumReport } from '@/lib/reports/generate-premium';
import { sendAuditReport } from '@/lib/email';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API_URL = process.env.NODE_ENV === 'production'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const auditId = searchParams.get('auditId');

    if (!token || !auditId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout?error=missing_params`
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Capture the payment
    const captureResponse = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captureData = await captureResponse.json();

    if (captureData.status !== 'COMPLETED') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout?error=payment_failed`
      );
    }

    // Get audit
    const audit = await prisma.audit.findUnique({
      where: { id: auditId },
      include: { user: true },
    });

    if (!audit) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout?error=audit_not_found`
      );
    }

    // Generate premium report
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
        amount: 79.0,
        currency: 'EUR',
        provider: 'PAYPAL',
        providerPaymentId: captureData.id,
        status: 'COMPLETED',
        paidAt: new Date(),
      },
    });

    // Send premium report by email
    try {
      await sendAuditReport({
        email: audit.user.email,
        name: audit.user.name || 'User',
        auditId: audit.id,
        reportHtml: premiumReportHtml,
        isPremium: true,
      });
    } catch (emailError) {
      console.error('Failed to send premium report email:', emailError);
      // Continue even if email fails
    }

    // Redirect to dashboard
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${auditId}?upgraded=true`
    );
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout?error=capture_failed`
    );
  }
}
