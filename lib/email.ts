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

async function sendEmail(to: string, subject: string, htmlContent: string, fromEmail: string = 'coaching@achzodcoaching.com') {
  const token = await getAccessToken();

  // SendPulse API requires HTML content to be Base64 encoded
  const htmlBase64 = Buffer.from(htmlContent, 'utf-8').toString('base64');

  const payload = {
    email: {
      html: htmlBase64,
      text: subject,
      subject: subject,
      from: {
        name: 'AchZod Coaching',
        email: fromEmail,
      },
      to: [
        {
          name: to.split('@')[0],
          email: to,
        },
      ],
    },
  };

  console.log('SendPulse payload (html truncated):', JSON.stringify({
    ...payload,
    email: { ...payload.email, html: payload.email.html.substring(0, 100) + '...' }
  }, null, 2));

  const response = await fetch('https://api.sendpulse.com/smtp/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  console.log('SendPulse response:', JSON.stringify(result, null, 2));

  if (!response.ok) {
    throw new Error(`SendPulse error: ${JSON.stringify(result)}`);
  }

  return result;
}

interface SendMagicLinkParams {
  email: string;
  token: string;
}

export async function sendMagicLink({ email, token }: SendMagicLinkParams) {
  const magicLinkUrl = `${process.env.NEXTAUTH_URL}/api/auth/callback/nodemailer?callbackUrl=${encodeURIComponent(process.env.NEXTAUTH_URL + '/dashboard')}&token=${token}&email=${encodeURIComponent(email)}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connexion - AchZod Coaching</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a2e; padding: 30px 40px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">AchZod Coaching</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a2e; font-size: 22px;">Connexion a ton espace</h2>
              <p style="margin: 0 0 25px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                Tu as demande un lien de connexion pour acceder a ton Audit Metabolique. Clique sur le bouton ci-dessous pour te connecter :
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                <tr>
                  <td style="background-color: #5EECC5; border-radius: 6px;">
                    <a href="${magicLinkUrl}" style="display: inline-block; padding: 16px 32px; color: #1a1a2e; text-decoration: none; font-weight: 600; font-size: 16px;">Se connecter</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 25px 0 0 0; color: #888888; font-size: 14px; line-height: 1.5;">
                Ce lien expire dans 1 heure.<br>
                Si tu n'as pas demande cette connexion, ignore simplement cet email.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f8f8; padding: 25px 40px; border-radius: 0 0 8px 8px; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                2025 AchZod Coaching - Tous droits reserves<br>
                coaching@achzodcoaching.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await sendEmail(email, 'Connexion a ton Audit Metabolique', html);
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
    ? 'Ton Audit Metabolique PREMIUM est pret'
    : 'Ton Audit Metabolique est pret';

  const features = isPremium
    ? `<li>40 axes metaboliques analyses en detail</li>
       <li>Analyse morphotype ultra-precise</li>
       <li>Protocole supplements personnalise</li>
       <li>Plan nutrition sur mesure</li>
       <li>Programme training optimise</li>
       <li>Roadmap 90 jours detaillee</li>`
    : `<li>Score metabolique global</li>
       <li>Top 3 forces identifiees</li>
       <li>Top 5 blocages analyses</li>
       <li>Stack supplements baseline</li>
       <li>Recommandations personnalisees</li>`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ton Audit est Pret - AchZod Coaching</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #1a1a2e; padding: 30px 40px; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">AchZod Coaching</h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a2e; font-size: 22px;">Ton Audit est Pret${isPremium ? ' - PREMIUM' : ''}</h2>
              <p style="margin: 0 0 25px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                Bonjour ${name},<br><br>
                Ton analyse metabolique complete a ete generee avec succes.
              </p>
              <p style="margin: 0 0 15px 0; color: #1a1a2e; font-size: 14px; font-weight: 600;">Ce que contient ton audit :</p>
              <ul style="margin: 0 0 25px 0; padding-left: 20px; color: #555555; font-size: 14px; line-height: 1.8;">
                ${features}
              </ul>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                <tr>
                  <td style="background-color: #5EECC5; border-radius: 6px;">
                    <a href="${dashboardUrl}" style="display: inline-block; padding: 16px 32px; color: #1a1a2e; text-decoration: none; font-weight: 600; font-size: 16px;">Voir mon audit</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 25px 0 0 0; color: #888888; font-size: 14px; line-height: 1.5;">
                Ton rapport est accessible a tout moment depuis ton dashboard.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f8f8; padding: 25px 40px; border-radius: 0 0 8px 8px; border-top: 1px solid #eeeeee;">
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                2025 AchZod Coaching - Tous droits reserves<br>
                coaching@achzodcoaching.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await sendEmail(email, subject, html);
}
