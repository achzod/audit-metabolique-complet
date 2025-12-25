import { NextResponse } from 'next/server';

// PayPal API configuration
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

export async function POST(request: Request) {
  try {
    const { plan, responses, auditId } = await request.json();

    if (plan !== 'PREMIUM') {
      return NextResponse.json(
        { error: 'Le paiement est requis uniquement pour la version premium' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getPayPalAccessToken();

    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '79.00',
            },
            description: 'Audit Métabolique Premium - Analyse complète 40 axes + Protocoles personnalisés',
          },
        ],
        application_context: {
          brand_name: 'AchZod Coaching',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/paypal/capture?auditId=${auditId || ''}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/audit-complet/checkout`,
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (orderData.error) {
      console.error('PayPal order creation error:', orderData);
      return NextResponse.json(
        { error: 'Erreur lors de la création de la commande PayPal' },
        { status: 500 }
      );
    }

    // Return approval URL
    const approvalUrl = orderData.links.find((link: any) => link.rel === 'approve')?.href;

    return NextResponse.json({
      orderId: orderData.id,
      approvalUrl,
    });
  } catch (error) {
    console.error('PayPal integration error:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement PayPal' },
      { status: 500 }
    );
  }
}
