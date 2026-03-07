import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.ZOHO_PASSWORD,
    },
});

// ─── Site Design Tokens ────────────────────────────────────────────────────
const LOGO_URL = 'https://swarooprealty.com/logo-white.png';
const SITE_URL = 'https://swarooprealty.com';
const NAVY = '#0A1128';   // --color-primary
const NAVY_DEEP = '#070d1e';   // deeper shade for footer
const WHITE = '#FFFFFF';
const OFF_WHITE = '#F8FAFC';   // --color-secondary
const ICE = '#F1F5F9';   // --color-bg-alt
const BORDER = '#E2E8F0';   // --color-border
const TEXT = '#0F172A';   // --color-text
const TEXT_MUTED = '#64748B';   // slate-500
const SKY = '#bae6fd';   // selection highlight blue
const SKY_DARK = '#0ea5e9';   // sky-500 — links/CTAs
// ──────────────────────────────────────────────────────────────────────────

function emailShell(body) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Swaroop Realty</title>
</head>
<body style="margin:0;padding:0;background-color:${ICE};font-family:'Helvetica Neue',Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${ICE};padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

        <!-- ── Hero Header ── -->
        <tr>
          <td style="background:${NAVY};border-radius:16px 16px 0 0;padding:40px 48px 36px;text-align:center;">
            <a href="${SITE_URL}" style="display:inline-block;text-decoration:none;">
              <img src="${LOGO_URL}" alt="Swaroop Realty" width="160" height="auto"
                   style="display:block;margin:0 auto;max-width:160px;height:auto;" />
            </a>
            <div style="margin-top:24px;width:48px;height:2px;background:${SKY};border-radius:2px;margin-left:auto;margin-right:auto;"></div>
          </td>
        </tr>

        <!-- ── Content ── -->
        <tr>
          <td style="background:${WHITE};padding:48px;line-height:1;">
            ${body}
          </td>
        </tr>

        <!-- ── Footer ── -->
        <tr>
          <td style="background:${NAVY_DEEP};border-radius:0 0 16px 16px;padding:28px 48px;text-align:center;">
            <p style="margin:0 0 6px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:2.5px;color:${SKY};">
              Swaroop Realty
            </p>
            <p style="margin:0 0 14px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);line-height:1.8;">
              Near Jait Police Station, Vrindavan – 281003, Uttar Pradesh, India
            </p>
            <p style="margin:0 0 18px 0;">
              <a href="mailto:contact@swarooprealty.com"
                 style="color:rgba(255,255,255,0.55);font-size:11px;text-decoration:none;font-family:'Helvetica Neue',Arial,sans-serif;">
                contact@swarooprealty.com
              </a>
              <span style="color:rgba(255,255,255,0.2);margin:0 8px;">·</span>
              <a href="tel:+918383928784"
                 style="color:rgba(255,255,255,0.55);font-size:11px;text-decoration:none;font-family:'Helvetica Neue',Arial,sans-serif;">
                +91 83839 28784
              </a>
            </p>
            <div style="width:32px;height:1px;background:rgba(255,255,255,0.1);margin:0 auto;"></div>
            <p style="margin:14px 0 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.2);">
              © ${new Date().getFullYear()} Swaroop Realty. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

// ── Admin Notification Template ──────────────────────────────────────────
function adminTemplate({ fullName, email, subject, message }) {
    return emailShell(`
      <!-- Label -->
      <p style="margin:0 0 8px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:2.5px;color:${SKY_DARK};">
        New Inquiry
      </p>
      <!-- Heading -->
      <h1 style="margin:0 0 32px 0;font-family:Georgia,serif;font-size:26px;font-weight:400;color:${NAVY};line-height:1.2;">
        You have a new message<br />from <em style="font-style:italic;">${fullName}</em>
      </h1>

      <!-- Info Cards Row -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td style="padding:14px 16px;background:${OFF_WHITE};border:1px solid ${BORDER};border-radius:8px 8px 0 0;border-bottom:none;">
            <p style="margin:0 0 3px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:${TEXT_MUTED};">From</p>
            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${TEXT};font-weight:500;">${fullName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 16px;background:${OFF_WHITE};border:1px solid ${BORDER};border-bottom:none;">
            <p style="margin:0 0 3px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:${TEXT_MUTED};">Email</p>
            <a href="mailto:${email}" style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${SKY_DARK};text-decoration:none;font-weight:500;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 16px;background:${OFF_WHITE};border:1px solid ${BORDER};border-radius:0 0 8px 8px;">
            <p style="margin:0 0 3px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:${TEXT_MUTED};">Subject</p>
            <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${TEXT};font-weight:500;">${subject || 'General Inquiry'}</p>
          </td>
        </tr>
      </table>

      <!-- Message Box -->
      <div style="background:${OFF_WHITE};border:1px solid ${BORDER};border-left:3px solid ${NAVY};border-radius:4px;padding:24px;">
        <p style="margin:0 0 10px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:${TEXT_MUTED};">Message</p>
        <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:${TEXT};line-height:1.8;white-space:pre-wrap;">${message}</p>
      </div>

      <!-- Reply Hint -->
      <p style="margin:24px 0 0 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:${TEXT_MUTED};font-style:italic;">
        Reply directly to this email to respond to ${fullName}.
      </p>
    `);
}

// ── Client Confirmation Template ─────────────────────────────────────────
function clientTemplate({ firstName, message }) {
    return emailShell(`
      <!-- Label -->
      <p style="margin:0 0 8px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:2.5px;color:${SKY_DARK};">
        Inquiry Received
      </p>
      <!-- Greeting -->
      <h1 style="margin:0 0 16px 0;font-family:Georgia,serif;font-size:28px;font-weight:400;color:${NAVY};line-height:1.2;">
        Thank you,<br /><em style="font-style:italic;">${firstName}.</em>
      </h1>
      <p style="margin:0 0 32px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;color:${TEXT_MUTED};line-height:1.7;">
        We have received your inquiry and our team will get back to you within <strong style="color:${TEXT};font-weight:600;">24 hours</strong>.
        We look forward to helping you discover premium real estate in Vrindavan and Braj.
      </p>

      <!-- Divider -->
      <div style="border-top:1px solid ${BORDER};margin-bottom:28px;"></div>

      <!-- Echoed Message -->
      <p style="margin:0 0 10px 0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:${TEXT_MUTED};">Your Message</p>
      <div style="background:${OFF_WHITE};border:1px solid ${BORDER};border-radius:8px;padding:20px 24px;margin-bottom:36px;">
        <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:${TEXT_MUTED};line-height:1.8;white-space:pre-wrap;">${message}</p>
      </div>

      <!-- CTA Button -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="border-radius:8px;background:${NAVY};">
            <a href="${SITE_URL}/projects"
               style="display:inline-block;padding:14px 36px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:${WHITE};text-decoration:none;border-radius:8px;">
              Explore Our Projects
            </a>
          </td>
        </tr>
      </table>
    `);
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, subject, message } = req.body;

    if (!firstName || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const fullName = `${firstName} ${lastName || ''}`.trim();
    const emailSubject = subject
        ? `Inquiry: ${subject} — ${fullName}`
        : `New Inquiry from ${fullName}`;

    try {
        await transporter.sendMail({
            from: `"Swaroop Realty" <${process.env.ZOHO_EMAIL}>`,
            to: 'contact@swarooprealty.com',
            replyTo: email,
            subject: emailSubject,
            html: adminTemplate({ fullName, email, subject, message }),
        });

        await transporter.sendMail({
            from: `"Swaroop Realty" <${process.env.ZOHO_EMAIL}>`,
            to: email,
            subject: 'Thank you for your inquiry — Swaroop Realty',
            html: clientTemplate({ firstName, message }),
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Nodemailer/Zoho error:', error);
        return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
}
