export async function fetchTodos() {
	const response = await fetch('./src/data/todos.json');
	const todos = await response.json();
	return todos;
}
