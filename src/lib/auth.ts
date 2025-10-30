import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
import { sendEmail } from "./email";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: 'Verify your email address',
				text: `Click the link to verify your email: ${url}`,
				html: `
					<!DOCTYPE html>
					<html>
					<head>
						<meta charset="UTF-8">
						<title>Verify your email address</title>
					</head>
					<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
						<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
							<div style="background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
								<h1 style="color: #333; margin-bottom: 30px; text-align: center;">Verify your email address</h1>
								<p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 30px;">
									Thank you for signing up! Please click the button below to verify your email address and complete your registration.
								</p>
								<div style="text-align: center; margin-bottom: 30px;">
									<a href="${url}" 
										style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
										Verify Email Address
									</a>
								</div>
								<p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
									If you didn't create an account, you can safely ignore this email.
								</p>
								<p style="color: #999; font-size: 14px; text-align: center;">
									If the button doesn't work, copy and paste this link into your browser:<br>
									<a href="${url}" style="color: #4CAF50; text-decoration: none;">${url}</a>
								</p>
							</div>
						</div>
					</body>
					</html>
				`
			})
		}
	},
	plugins: [
		openAPI(),
	]
});