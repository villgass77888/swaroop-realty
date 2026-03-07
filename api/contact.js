import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, subject, message } = req.body;

    // Basic validation
    if (!firstName || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const fullName = `${firstName} ${lastName || ''}`.trim();
    const emailSubject = subject ? `Inquiry: ${subject}` : `New Inquiry from ${fullName}`;

    try {
        // 1. Send inquiry notification to admin at contact@swarooprealty.com
        await resend.emails.send({
            from: 'Swaroop Realty <info@swarooprealty.com>',
            to: ['contact@swarooprealty.com'],
            reply_to: email,
            subject: emailSubject,
            html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0a0a0a; color: #fff;">
                    <h2 style="color: #c9a96e; font-size: 1.5rem; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
                        New Inquiry — Swaroop Realty
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; width: 30%;">Name</td><td style="padding: 8px 0; color: #fff;">${fullName}</td></tr>
                        <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c9a96e;">${email}</a></td></tr>
                        <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">Subject</td><td style="padding: 8px 0; color: #fff;">${subject || 'General Inquiry'}</td></tr>
                    </table>
                    <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                        <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Message</p>
                        <p style="color: rgba(255,255,255,0.85); line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="margin-top: 24px; color: rgba(255,255,255,0.3); font-size: 0.8rem;">Reply directly to this email to respond to ${fullName}.</p>
                </div>
            `,
        });

        // 2. Send confirmation receipt to client from info@swarooprealty.com
        await resend.emails.send({
            from: 'Swaroop Realty <info@swarooprealty.com>',
            to: [email],
            subject: 'Thank you for your inquiry — Swaroop Realty',
            html: `
                <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #0a0a0a; color: #fff;">
                    <h2 style="color: #c9a96e; font-size: 1.5rem; margin-bottom: 8px;">Thank you, ${firstName}.</h2>
                    <p style="color: rgba(255,255,255,0.6); font-size: 1rem; margin-bottom: 32px; line-height: 1.6;">
                        We have received your inquiry and our team will get back to you within 24 hours.
                    </p>
                    <div style="padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 32px;">
                        <p style="color: rgba(255,255,255,0.4); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Your Message</p>
                        <p style="color: rgba(255,255,255,0.8); line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
                    <p style="color: rgba(255,255,255,0.4); font-size: 0.85rem; line-height: 1.8;">
                        <strong style="color: rgba(255,255,255,0.7);">Swaroop Realty</strong><br />
                        Near Jait Police Station, Vrindavan – 281003<br />
                        <a href="mailto:contact@swarooprealty.com" style="color: #c9a96e; text-decoration: none;">contact@swarooprealty.com</a> &nbsp;|&nbsp;
                        <a href="tel:+918383928784" style="color: #c9a96e; text-decoration: none;">+91 83839 28784</a>
                    </p>
                </div>
            `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
}
