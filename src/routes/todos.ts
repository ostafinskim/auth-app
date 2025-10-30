import { Hono } from 'hono';
import { createTodoValidator } from '../validators/create-todo.validator';

const app = new Hono();

// Przykład jak działa flow requestu
app.post('/todos', createTodoValidator, async (c) => {
	// 1. Request z danymi już przeszedł przez validator
	// 2. Jeśli tu jesteśmy, oznacza to że dane są poprawne
	// 3. Możemy bezpiecznie pobrać zwalidowane dane:
	const data = c.req.valid('json');

	console.log('Zwalidowane dane:', data);
	// data będzie miała dokładnie taki kształt jak w schemacie:
	// {
	//    title: string (niepusty),
	//    description?: string (opcjonalny),
	//    completed: boolean
	// }

	// Możesz teraz bezpiecznie użyć tych danych
	// np. zapisać do bazy:
	// const todo = await db.insert(todos).values(data);

	return c.json({
		message: 'Todo created!',
		data: data
	});
});

export default app;