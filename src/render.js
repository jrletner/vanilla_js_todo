import { fetchTodos } from './fetchTodos.js';
import { deleteTodo } from './helper/deleteTodo.js';
import {addTodo} from './helper/addTodo.js'
import {editTodo} from './helper/editTodo.js'
import { toggleTodo } from './helper/toggleTodo.js';

export async function render() {
	const todosData = await fetchTodos();
	const todos = todosData.todos;
	let html = '';
	for (const todo of todos) {
		 html += `
		 	<div class="flex items-center bg-gray-50 rounded-lg shadow-sm p-4 mb-3 w-full max-w-md">
		 		<input type="checkbox" id="toggleCheckbox-${todo.id}" class="mr-4 h-5 w-5 accent-blue-500" ${todo.isComplete ? 'checked' : ''} />
 
		 		<div class="flex flex-col flex-grow">
		 			<span class="text-lg font-medium text-gray-800${todo.isComplete ? ' line-through' : ''}">${todo.title}</span>
		 			<span class="text-sm text-gray-500 mt-1">Due: ${todo.dueDate}</span>
		 		</div>
 
		 		<div class="flex space-x-2 ml-4">
		 			<button id="editButton-${todo.id}" class="px-3 py-1 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition" aria-label="Edit Todo">Edit</button>
 
		 			<button id="deleteButton-${todo.id}" class="px-3 py-1 bg-red-500 text-white font-bold rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition" aria-label="Delete Todo">Delete</button>
		 		</div>
		 	</div>
		 	`;
	}
	const todoList = document.getElementById('todo-list');
	todoList.innerHTML = html;

	// Attach delete event listeners
	todos.forEach(todo => {
		const deleteButton = document.getElementById(`deleteButton-${todo.id}`);
		if (deleteButton) {
			deleteButton.addEventListener('click', async () => {
				const success = await deleteTodo(todo.id);
				if (success) {
					render(); // Re-render after deletion
				} else {
					alert('Failed to delete todo.');
				}
			});
		}
	});

	 // Attach edit event listeners
	 todos.forEach(todo => {
	 	const editButton = document.getElementById(`editButton-${todo.id}`);
	 	if (editButton) {
	 		editButton.addEventListener('click', () => {
	 			if (addBtn) addBtn.style.display = 'none';
	 			todoList.innerHTML = `
	 				<div class="flex flex-col bg-gray-50 rounded-lg shadow-sm p-4 mb-3 w-full max-w-md">
	 					<div class="flex items-center mb-2">
	 						<input type="text" value="${todo.title}" class="mr-4 h-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300" />
	 						<input type="date" value="${todo.dueDate}" class="h-10 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300" />
	 					</div>
	 					<div class="flex items-center">
	 						<button class="px-3 py-1 bg-green-500 text-white font-bold rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition ml-2 opacity-50 cursor-not-allowed" disabled>Save</button>
	 						<button class="px-3 py-1 bg-gray-300 text-gray-700 font-bold rounded shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ml-2">Cancel</button>
	 					</div>
	 				</div>
	 			`;
	 			const saveBtn = todoList.querySelector('button.bg-green-500');
	 			const cancelBtn = todoList.querySelector('button.bg-gray-300');
	 			const input = todoList.querySelector('input[type="text"]');
	 			const dateInput = todoList.querySelector('input[type="date"]');
	 			function updateSaveBtnState() {
	 				if (input.value.trim() === '' || !dateInput.value) {
	 					saveBtn.disabled = true;
	 					saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
	 				} else {
	 					saveBtn.disabled = false;
	 					saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
	 				}
	 			}
	 			input.addEventListener('input', updateSaveBtnState);
	 			dateInput.addEventListener('input', updateSaveBtnState);
	 			updateSaveBtnState();
	 			cancelBtn.onclick = () => {
	 				if (addBtn) addBtn.style.display = '';
	 				render();
	 			};
	 			saveBtn.onclick = async () => {
	 				const newTitle = input.value.trim();
	 				const newDueDate = dateInput.value;
	 				if (newTitle && newDueDate) {
	 					const success = await editTodo(todo.id, { ...todo, title: newTitle, dueDate: newDueDate });
	 					if (addBtn) addBtn.style.display = '';
	 					render();
	 				}
	 			};
	 		});
	 	}
	 });

	 // Attach toggle event listeners
	 todos.forEach(todo => {
	 	const checkbox = document.getElementById(`toggleCheckbox-${todo.id}`);
	 	if (checkbox) {
	 		checkbox.addEventListener('change', async (e) => {
	 			const isComplete = e.target.checked;
	 			await toggleTodo(todo.id, isComplete);
	 			render();
	 		});
	 	}
	 });

	// Add New Todo input logic
	const addBtn = document.getElementById('addBtn');
	if (addBtn) {
		addBtn.onclick = () => {
			// Hide the Add New Todo button
			addBtn.style.display = 'none';
			// Render input, save, cancel
			todoList.innerHTML = `
				<div class="flex flex-col bg-gray-50 rounded-lg shadow-sm p-4 mb-3 w-full max-w-md">
					<div class="flex items-center mb-2">
						<input type="text" placeholder="Todo title" class="mr-4 h-10 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300" />
						<input type="date" class="h-10 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300" />
					</div>
					<div class="flex items-center">
						<button class="px-3 py-1 bg-green-500 text-white font-bold rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition ml-2 opacity-50 cursor-not-allowed" disabled>Save</button>
						<button class="px-3 py-1 bg-gray-300 text-gray-700 font-bold rounded shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition ml-2">Cancel</button>
					</div>
				</div>
			`;
			// Save and Cancel logic
			const saveBtn = todoList.querySelector('button.bg-green-500');
			const cancelBtn = todoList.querySelector('button.bg-gray-300');
			const input = todoList.querySelector('input[type="text"]');
			const dateInput = todoList.querySelector('input[type="date"]');
			// Initially disable Save if input is blank
			saveBtn.disabled = true;
			saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
			function updateSaveBtnState() {
				if (input.value.trim() === '' || !dateInput.value) {
					saveBtn.disabled = true;
					saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
				} else {
					saveBtn.disabled = false;
					saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
				}
			}
			input.addEventListener('input', updateSaveBtnState);
			dateInput.addEventListener('input', updateSaveBtnState);
			updateSaveBtnState();
			cancelBtn.onclick = () => {
				addBtn.style.display = '';
				render();
			};
			saveBtn.onclick = async () => {
				const newTitle = input.value.trim();
				const dueDate = dateInput.value
				if (newTitle) {
					const success = await addTodo(newTitle,dueDate);
					if (success) {
						addBtn.style.display = '';
						render();
			} else {
				alert('Failed to delete todo.');
			}
		};
				}
			};
		};
	}
