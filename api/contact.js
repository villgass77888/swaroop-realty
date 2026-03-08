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
<body style="margin:0;padding:0;background:${WHITE};font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WHITE};">
  <tr><td align="center">
    
    <!-- Header (Full Bleed) -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${NAVY};">
      <tr>
        <td align="center" style="padding:28px 20px;">
          <a href="${SITE_URL}" style="display:inline-block;">
            <img src="${LOGO_URL}" alt="Swaroop Realty" width="140" height="auto" style="display:block;max-width:140px;" />
          </a>
        </td>
      </tr>
      <tr><td style="background:${SKY};height:3px;line-height:0;font-size:0;">&nbsp;</td></tr>
    </table>

    <!-- Content Area (Responsive width, no box constraints) -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
      <tr>
        <td style="padding:40px 24px;">
          ${body}
        </td>
      </tr>
    </table>

    <!-- Footer (Full Bleed) -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${OFF_WHITE};border-top:1px solid ${BORDER};">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${NAVY};font-weight:700;">Swaroop Realty</p>
          <p style="margin:0 0 12px;font-size:12px;color:${MUTED};line-height:1.6;">Near Jait Police Station, Vrindavan – 281003, UP, India</p>
          <p style="margin:0;font-size:12px;">
            <a href="mailto:contact@swarooprealty.com" style="color:${SKY};text-decoration:none;font-weight:500;">contact@swarooprealty.com</a>
            <span style="color:${BORDER};margin:0 10px;">|</span>
            <a href="tel:+918383928784" style="color:${SKY};text-decoration:none;font-weight:500;">+91 83839 28784</a>
          </p>
          <p style="margin:20px 0 0;font-size:11px;color:#94a3b8;">© ${new Date().getFullYear()} Swaroop Realty. All rights reserved.</p>
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
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${SKY};">New Inquiry</p>
      <h1 style="margin:0 0 36px;font-family:Georgia,serif;font-size:26px;font-weight:400;color:${NAVY};line-height:1.3;">
        Message from ${fullName}
      </h1>

      <!-- Clean, flat table layout for fields -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;border-top:1px solid ${BORDER};">
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid ${BORDER};width:80px;">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${MUTED};">Name</span>
          </td>
          <td style="padding:16px 0;border-bottom:1px solid ${BORDER};">
            <span style="font-size:15px;color:${TEXT};font-weight:500;">${fullName}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid ${BORDER};width:80px;">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${MUTED};">Email</span>
          </td>
          <td style="padding:16px 0;border-bottom:1px solid ${BORDER};">
            <a href="mailto:${email}" style="font-size:15px;color:${SKY};text-decoration:none;font-weight:500;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid ${BORDER};width:80px;">
            <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${MUTED};">Subject</span>
          </td>
          <td style="padding:16px 0;border-bottom:1px solid ${BORDER};">
            <span style="font-size:15px;color:${TEXT};">${subject || 'General Inquiry'}</span>
          </td>
        </tr>
      </table>

      <!-- Flat message block -->
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${MUTED};">Message</p>
      <p style="margin:0 0 32px;font-family:Georgia,serif;font-size:16px;color:${TEXT};line-height:1.8;white-space:pre-wrap;padding-bottom:32px;border-bottom:1px solid ${BORDER};">${message}</p>

      <p style="margin:0;font-size:13px;color:${MUTED};">Reply directly to this email to respond to ${fullName}.</p>
    `);
}

// ── Client Confirmation ──────────────────────────────────────────────────
function clientTemplate({ firstName, message }) {
    return emailShell(`
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${SKY};">Inquiry Received</p>
      <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:30px;font-weight:400;color:${NAVY};line-height:1.2;">
        Thank you, ${firstName}.
      </h1>
      <p style="margin:0 0 40px;font-size:16px;color:${MUTED};line-height:1.7;">
        We've received your inquiry and our team will get back to you within <strong style="color:${TEXT};font-weight:600;">24 hours</strong>.
        We look forward to helping you discover premium real estate in Vrindavan and Braj.
      </p>

      <!-- Minimal Flat Divider -->
      <div style="height:1px;background:${BORDER};margin-bottom:32px;"></div>

      <!-- Flat echoed message -->
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${MUTED};">Your Message:</p>
      <p style="margin:0 0 44px;font-family:Georgia,serif;font-size:15px;color:${MUTED};line-height:1.8;white-space:pre-wrap;">"${message}"</p>

      <!-- Flat CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="background:${NAVY};">
            <a href="${SITE_URL}/projects"
               style="display:inline-block;padding:16px 36px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${WHITE};text-decoration:none;">
              Explore Projects
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
        await Promise.all([
            transporter.sendMail({
                from: `"${fullName}" <${process.env.ZOHO_EMAIL}>`,
                to: 'contact@swarooprealty.com',
                replyTo: email,
                subject: emailSubject,
                html: adminTemplate({ fullName, email, subject, message }),
            }),
            transporter.sendMail({
                from: `"Swaroop Realty" <${process.env.ZOHO_EMAIL}>`,
                to: email,
                subject: 'Thank you for your inquiry — Swaroop Realty',
                html: clientTemplate({ firstName, message }),
            }),
        ]);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Nodemailer/Zoho error:', error);
        return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
}
