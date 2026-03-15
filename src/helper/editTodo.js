export async function editTodo(id, updatedFields) {
	const response = await fetch(`http://localhost:3000/todos/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedFields)
	});
	return response.ok;
}