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

// ─── Design Tokens (from site index.css) ──────────────────────────────────
const LOGO_URL = 'https://swarooprealty.com/logo-white.png';
const SITE_URL = 'https://swarooprealty.com';
const NAVY = '#0A1128';
const NAVY_DEEP = '#070d1e';
const WHITE = '#FFFFFF';
const OFF_WHITE = '#F8FAFC';
const BORDER = '#E2E8F0';
const TEXT = '#0F172A';
const MUTED = '#64748B';
const SKY = '#0ea5e9';
// ──────────────────────────────────────────────────────────────────────────

function emailShell(body) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><title>Swaroop Realty</title></head>
<body style="margin:0;padding:0;background:${OFF_WHITE};font-family:'Helvetica Neue',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OFF_WHITE};padding:40px 16px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:${NAVY};border-radius:16px 16px 0 0;padding:36px 48px;text-align:center;">
          <a href="${SITE_URL}">
            <img src="${LOGO_URL}" alt="Swaroop Realty" width="152" height="auto" style="display:block;margin:0 auto;" />
          </a>
        </td>
      </tr>

      <!-- Thin accent line -->
      <tr>
        <td style="background:${SKY};height:3px;border-radius:0;font-size:0;line-height:0;">&nbsp;</td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:${WHITE};border-radius:0 0 16px 16px;padding:48px 48px 40px;">
          ${body}
        </td>
      </tr>

      <!-- Spacer -->
      <tr><td style="height:24px;"></td></tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="padding:0 16px 40px;">
          <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${NAVY};font-weight:700;">Swaroop Realty</p>
          <p style="margin:0 0 10px;font-size:11px;color:${MUTED};line-height:1.7;">Near Jait Police Station, Vrindavan – 281003, UP, India</p>
          <p style="margin:0;font-size:11px;">
            <a href="mailto:contact@swarooprealty.com" style="color:${SKY};text-decoration:none;">contact@swarooprealty.com</a>
            <span style="color:${BORDER};margin:0 8px;">·</span>
            <a href="tel:+918383928784" style="color:${SKY};text-decoration:none;">+91&nbsp;83839&nbsp;28784</a>
          </p>
          <p style="margin:16px 0 0;font-size:10px;color:#CBD5E1;">© ${new Date().getFullYear()} Swaroop Realty. All rights reserved.</p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

// ── Admin Notification ───────────────────────────────────────────────────
function adminTemplate({ fullName, email, subject, message }) {
    return emailShell(`
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${SKY};">New Inquiry</p>
      <h1 style="margin:0 0 32px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:${NAVY};line-height:1.3;">
        Message from <em>${fullName}</em>
      </h1>

      <!-- Fields — open layout, just dividers -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid ${BORDER};">
            <span style="display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${MUTED};margin-bottom:4px;">From</span>
            <span style="font-size:14px;color:${TEXT};">${fullName}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid ${BORDER};">
            <span style="display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${MUTED};margin-bottom:4px;">Email</span>
            <a href="mailto:${email}" style="font-size:14px;color:${SKY};text-decoration:none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;">
            <span style="display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${MUTED};margin-bottom:4px;">Subject</span>
            <span style="font-size:14px;color:${TEXT};">${subject || 'General Inquiry'}</span>
          </td>
        </tr>
      </table>

      <!-- Message — minimal tint, no hard border -->
      <p style="margin:0 0 10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${MUTED};">Message</p>
      <p style="margin:0 0 28px;font-family:Georgia,serif;font-size:15px;color:${TEXT};line-height:1.8;white-space:pre-wrap;padding:20px;background:${OFF_WHITE};border-radius:8px;">${message}</p>

      <p style="margin:0;font-size:12px;color:${MUTED};font-style:italic;">Hit Reply to respond directly to ${fullName}.</p>
    `);
}

// ── Client Confirmation ──────────────────────────────────────────────────
function clientTemplate({ firstName, message }) {
    return emailShell(`
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${SKY};">Inquiry Confirmed</p>
      <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:28px;font-weight:400;color:${NAVY};line-height:1.2;">
        Thank you, <em>${firstName}.</em>
      </h1>
      <p style="margin:0 0 36px;font-size:15px;color:${MUTED};line-height:1.8;">
        We've received your inquiry and will get back to you within <strong style="color:${TEXT};">24 hours</strong>.
        We look forward to helping you discover premium real estate in Vrindavan and Braj.
      </p>

      <!-- Divider -->
      <div style="border-top:1px solid ${BORDER};margin-bottom:28px;"></div>

      <!-- Echoed message — open, no box border -->
      <p style="margin:0 0 10px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:${MUTED};">Your Message</p>
      <p style="margin:0 0 40px;font-family:Georgia,serif;font-size:14px;color:${MUTED};line-height:1.8;white-space:pre-wrap;padding:16px 0 16px 20px;border-left:3px solid ${SKY};">${message}</p>

      <!-- CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:${NAVY};border-radius:8px;">
            <a href="${SITE_URL}/projects"
               style="display:inline-block;padding:13px 32px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${WHITE};text-decoration:none;">
              Explore Projects →
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
