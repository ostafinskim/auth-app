import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";
import { AuthUserAndSession } from "../../types";

export const authMiddleware = createMiddleware<AuthUserAndSession>(async (c, next) => {

	const session = await auth.api.getSession({ headers: c.req.raw.headers })

	if (!session) {
		return c.json({ error: 'Unauthorized' }, 401)
	}

	c.set('user', session.user)
	c.set('session', session.session)
	return next()
})