
export async function toggleTodo(id, isComplete) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isComplete }),
    });
    if (!response.ok) {
      throw new Error('Failed to toggle todo');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
