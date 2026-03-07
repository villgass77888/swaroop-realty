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

const LOGO_URL = 'https://swarooprealty.com/logo-white.png';
const SITE_URL = 'https://swarooprealty.com';
const GOLD = '#c9a96e';
const BG = '#0e0e0e';
const BG_CARD = '#161616';
const BORDER = 'rgba(201,169,110,0.2)';

// Shared email wrapper with logo header
function emailWrapper(content) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Swaroop Realty</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo Header -->
          <tr>
            <td style="background:${BG};border:1px solid ${BORDER};border-bottom:none;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <a href="${SITE_URL}" style="display:inline-block;">
                <img src="${LOGO_URL}" alt="Swaroop Realty" width="180" style="display:block;height:auto;max-width:180px;" />
              </a>
              <div style="width:60px;height:1px;background:linear-gradient(to right,transparent,${GOLD},transparent);margin:20px auto 0;"></div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="background:${BG_CARD};border-left:1px solid ${BORDER};border-right:1px solid ${BORDER};padding:40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${BG};border:1px solid ${BORDER};border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.3);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Swaroop Realty</p>
              <p style="margin:0 0 12px;color:rgba(255,255,255,0.25);font-size:11px;line-height:1.7;">
                Near Jait Police Station, Vrindavan – 281003, UP, India
              </p>
              <p style="margin:0;">
                <a href="mailto:contact@swarooprealty.com" style="color:${GOLD};text-decoration:none;font-size:11px;">contact@swarooprealty.com</a>
                <span style="color:rgba(255,255,255,0.15);margin:0 8px;">|</span>
                <a href="tel:+918383928784" style="color:${GOLD};text-decoration:none;font-size:11px;">+91 83839 28784</a>
              </p>
              <div style="width:40px;height:1px;background:${BORDER};margin:16px auto 0;"></div>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.15);font-size:10px;">© ${new Date().getFullYear()} Swaroop Realty. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// Admin notification template
function adminTemplate({ fullName, email, subject, message }) {
    return emailWrapper(`
        <h2 style="margin:0 0 6px;color:${GOLD};font-size:22px;font-weight:normal;letter-spacing:0.5px;">New Inquiry Received</h2>
        <p style="margin:0 0 28px;color:rgba(255,255,255,0.35);font-size:12px;text-transform:uppercase;letter-spacing:2px;">via swarooprealty.com</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:1.5px;display:block;margin-bottom:4px;">Name</span>
              <span style="color:#fff;font-size:15px;">${fullName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:1.5px;display:block;margin-bottom:4px;">Email</span>
              <a href="mailto:${email}" style="color:${GOLD};font-size:15px;text-decoration:none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;">
              <span style="color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:1.5px;display:block;margin-bottom:4px;">Subject</span>
              <span style="color:#fff;font-size:15px;">${subject || 'General Inquiry'}</span>
            </td>
          </tr>
        </table>

        <div style="background:#0e0e0e;border:1px solid rgba(201,169,110,0.15);border-left:3px solid ${GOLD};border-radius:4px;padding:20px 24px;">
          <p style="margin:0 0 10px;color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:1.5px;">Message</p>
          <p style="margin:0;color:rgba(255,255,255,0.85);font-size:15px;line-height:1.8;white-space:pre-wrap;">${message}</p>
        </div>

        <p style="margin:24px 0 0;color:rgba(255,255,255,0.3);font-size:12px;font-style:italic;">
          Reply directly to this email to respond to ${fullName}.
        </p>
    `);
}

// Client confirmation template
function clientTemplate({ firstName, message }) {
    return emailWrapper(`
        <p style="margin:0 0 4px;color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:2px;">Inquiry Confirmed</p>
        <h2 style="margin:0 0 20px;color:#fff;font-size:26px;font-weight:normal;">
            Thank you, <em style="color:${GOLD};font-style:italic;">${firstName}.</em>
        </h2>
        <p style="margin:0 0 28px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.8;">
            We have received your inquiry and our team will get back to you within <strong style="color:#fff;">24 hours</strong>.
            We look forward to assisting you in discovering the finest real estate opportunities in Vrindavan and Braj.
        </p>

        <div style="background:#0e0e0e;border:1px solid rgba(201,169,110,0.15);border-radius:8px;padding:20px 24px;margin-bottom:28px;">
            <p style="margin:0 0 10px;color:rgba(255,255,255,0.35);font-size:10px;text-transform:uppercase;letter-spacing:1.5px;">Your Message</p>
            <p style="margin:0;color:rgba(255,255,255,0.7);font-size:14px;line-height:1.8;white-space:pre-wrap;">${message}</p>
        </div>

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-top:8px;">
              <a href="${SITE_URL}/projects" style="display:inline-block;padding:14px 32px;background:transparent;border:1px solid ${GOLD};border-radius:30px;color:${GOLD};text-decoration:none;font-size:11px;text-transform:uppercase;letter-spacing:2px;font-family:Georgia,serif;">
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
    const emailSubject = subject ? `Inquiry: ${subject}` : `New Inquiry from ${fullName}`;

    try {
        // 1. Admin notification → contact@swarooprealty.com
        await transporter.sendMail({
            from: `"Swaroop Realty" <${process.env.ZOHO_EMAIL}>`,
            to: 'contact@swarooprealty.com',
            replyTo: email,
            subject: emailSubject,
            html: adminTemplate({ fullName, email, subject, message }),
        });

        // 2. Confirmation receipt → client's email
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
