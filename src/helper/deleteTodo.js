export async function deleteTodo(id) {
	// Delete the todo with the given id from json-server
	const response = await fetch(`http://localhost:3000/todos/${id}`, {
		method: 'DELETE'
	});
	return response.ok;
}
