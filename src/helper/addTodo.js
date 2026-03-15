import { uuidv4 } from './uuid.js';

export async function addTodo(title,dueDate,isComplete=false) {
  const id = uuidv4();
  const todo = { id, title, isComplete, dueDate };
  const response = await fetch(`http://localhost:3000/todos/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(todo)
  });
  return response.ok;
}