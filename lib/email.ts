// SendPulse API configuration
const SENDPULSE_API_USER_ID = process.env.SENDPULSE_API_USER_ID;
const SENDPULSE_API_SECRET = process.env.SENDPULSE_API_SECRET;

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const response = await fetch('https://api.sendpulse.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: SENDPULSE_API_USER_ID,
      client_secret: SENDPULSE_API_SECRET,
    }),
  });

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1 min buffer
  return accessToken!;
}

async function sendEmail(to: string, subject: string, html: string, from: string = 'coaching@achzodcoaching.com') {
  const token = await getAccessToken();

  const response = await fetch('https://api.sendpulse.com/smtp/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: {
        subject,
        from: { name: 'AchZod Coaching', email: from },
        to: [{ email: to }],
        html,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SendPulse error: ${error}`);
  }

  return response.json();
}

interface SendMagicLinkParams {
  email: string;
  token: string;
}

export async function sendMagicLink({ email, token }: SendMagicLinkParams) {
  const magicLinkUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { font-size: 48px; margin-bottom: 20px; }
        h1 { font-size: 32px; font-weight: 800; background: linear-gradient(135deg, #00d4ff 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; }
        .card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; margin: 30px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #a855f7 100%); color: #0a0a0a; font-weight: 700; font-size: 18px; padding: 18px 40px; border-radius: 16px; text-decoration: none; margin: 20px 0; }
        .info { color: rgba(255, 255, 255, 0.6); font-size: 14px; line-height: 1.6; margin-top: 30px; }
        .footer { text-align: center; color: rgba(255, 255, 255, 0.4); font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🔥</div>
          <h1>Connexion Magique</h1>
        </div>

        <div class="card">
          <p style="font-size: 18px; margin: 0 0 30px 0;">
            Clique sur le bouton ci-dessous pour te connecter à ton espace audit métabolique:
          </p>

          <div style="text-align: center;">
            <a href="${magicLinkUrl}" class="button">
              🚀 Se Connecter Maintenant
            </a>
          </div>

          <div class="info">
            <p><strong>⏰ Ce lien expire dans 1 heure</strong></p>
            <p>Si tu n'as pas demandé cette connexion, ignore simplement cet email.</p>
          </div>
        </div>

        <div class="footer">
          <p>© 2025 AchZod Coaching - Tous droits réservés</p>
          <p>coaching@achzodcoaching.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail(email, '🔥 Connexion à ton Audit Métabolique', html);
}

interface SendAuditReportParams {
  email: string;
  name: string;
  auditId: string;
  reportHtml: string;
  isPremium: boolean;
}

export async function sendAuditReport({
  email,
  name,
  auditId,
  isPremium,
}: SendAuditReportParams) {
  const dashboardUrl = `${process.env.NEXTAUTH_URL}/dashboard/${auditId}`;

  const subject = isPremium
    ? '💎 Ton Audit Métabolique PREMIUM est prêt!'
    : '🎁 Ton Audit Métabolique GRATUIT est prêt!';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; }
        .logo { font-size: 64px; margin-bottom: 20px; }
        h1 { font-size: 36px; font-weight: 800; background: linear-gradient(135deg, #00d4ff 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; }
        .card { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; margin: 30px 0; text-align: center; }
        .button { display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #a855f7 100%); color: #0a0a0a; font-weight: 700; font-size: 18px; padding: 18px 40px; border-radius: 16px; text-decoration: none; margin: 20px 0; }
        .features { text-align: left; margin: 30px 0; }
        .feature { margin: 15px 0; font-size: 16px; }
        .footer { text-align: center; color: rgba(255, 255, 255, 0.4); font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">${isPremium ? '💎' : '🎁'}</div>
          <h1>Ton Audit est Prêt!</h1>
        </div>

        <div class="card">
          <p style="font-size: 20px; margin: 0 0 10px 0;">Salut <strong>${name}</strong> 👋</p>
          <p style="font-size: 16px; color: rgba(255, 255, 255, 0.7); margin: 0 0 30px 0;">
            Ton analyse métabolique complète a été générée avec succès!
          </p>

          <div class="features">
            ${isPremium ? `
              <div class="feature">✅ 40 axes métaboliques analysés en détail</div>
              <div class="feature">✅ Analyse morphotype ultra-précise</div>
              <div class="feature">✅ Protocole suppléments personnalisé (dosages, timing, cycles)</div>
              <div class="feature">✅ Plan nutrition sur mesure</div>
              <div class="feature">✅ Programme training optimisé</div>
              <div class="feature">✅ Roadmap 90 jours détaillée</div>
            ` : `
              <div class="feature">✅ Score métabolique global</div>
              <div class="feature">✅ Top 3 forces identifiées</div>
              <div class="feature">✅ Top 5 blocages analysés</div>
              <div class="feature">✅ Stack suppléments baseline</div>
              <div class="feature">✅ Recommandations personnalisées</div>
            `}
          </div>

          <a href="${dashboardUrl}" class="button">
            📊 Voir Mon Audit Complet
          </a>

          <p style="font-size: 14px; color: rgba(255, 255, 255, 0.5); margin-top: 30px;">
            Ton rapport est également accessible à tout moment depuis ton dashboard.
          </p>
        </div>

        ${!isPremium ? `
        <div class="card">
          <h2 style="font-size: 24px; margin: 0 0 20px 0;">🚀 Passe au Premium</h2>
          <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 20px;">
            Débloque l'analyse complète des 40 axes + protocoles détaillés
          </p>
          <a href="${process.env.NEXTAUTH_URL}/audit-complet/checkout?auditId=${auditId}" class="button">
            💎 Upgrade Premium - 79€
          </a>
        </div>
        ` : ''}

        <div class="footer">
          <p>© 2025 AchZod Coaching - Tous droits réservés</p>
          <p>coaching@achzodcoaching.com</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail(email, subject, html);
}
