import nodemailer from 'nodemailer';

export async function sendMail(to: string, subject: string, html: string) {
	if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
		console.warn('SMTP credentials are not fully configured. Skipping email delivery.');
		return Promise.resolve(true);
	}

	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT) || 587,
		secure: process.env.SMTP_PORT === '465',
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	try {
		return await transporter.sendMail({
			from: `"Al Mumeetu" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
			to,
			subject,
			html,
		});
	} catch (error) {
		console.error('Email sending failed:', error);
		// Don't throw error to prevent breaking the main flow (like form submission)
		return Promise.resolve(false);
	}
}
