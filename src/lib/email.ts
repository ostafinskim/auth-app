import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: 2525,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	},
	secure: false
});

interface EmailOptions {
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

export const sendEmail = async ({ to, subject, text, html }: EmailOptions) => {
	const mailOptions = {
		from: process.env.SMTP_FROM || "noreply@example.com",
		to,
		subject,
		text,
		html
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
		return info;
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
};