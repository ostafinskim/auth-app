import { auth } from '@/auth'
import { todos } from '@/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export type Todo = InferSelectModel<typeof todos>
export type NewTodo = InferInsertModel<typeof todos>

export type AuthUserAndSession = {
	Variables: {
		user: typeof auth.$Infer.Session.user | null
		session: typeof auth.$Infer.Session.session | null
	}
}