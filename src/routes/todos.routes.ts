import { Hono } from "hono";
import type { AuthUserAndSession } from '../../types';
import { getTodosByUserId, insertTodo } from "../db/queries";
import { authMiddleware } from "../middleware/auth";
import { createTodoValidator } from "../validators/create-todo.validator";

export const todos = new Hono<AuthUserAndSession>()

todos.use(authMiddleware)

todos.get('/', async (c) => {
	const user = c.get('user')

	try {
		const todoList = await getTodosByUserId(user.id)

		if (!todoList || todoList.length === 0) {
			return c.json({ todos: [] })
		}

		return c.json({ todos: todoList })
	} catch (error) {
		console.error(`Error fetching todos: `, error)
		return c.json({ error: 'Failed to fetch todos' }, 500)
	}
})

todos.post('/', createTodoValidator, async (c) => {
	const user = c.get('user')
	const todoData = c.req.valid('json')

	try {
		const newTodo = await insertTodo({
			...todoData,
			userId: user.id
		})
		return c.json(newTodo, 201)
	} catch (error) {
		console.error(`Error creating todo: `, error)
		return c.json({ error: 'Failed to create todos' }, 500)
	}
})