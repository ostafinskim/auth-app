import { betterAuth } from 'better-auth';
import { sendEmail } from './lib/email';

export const auth = betterAuth({
	emailVerification: {
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, url }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Verify your email address',
				text: `Click this link to verify your email: ${url}`,
				html: `
          <h1>Email Verification</h1>
          <p>Click the button below to verify your email address:</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
            Verify Email
          </a>
        `
			});
		}
	}
});