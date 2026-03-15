# Vanilla JavaScript Todo App

This is a simple, modern Todo application built with vanilla JavaScript and styled using Tailwind CSS. It uses json-server for persistent data storage and CRUD operations.

## Features

- Add new todos with a title and selectable due date
- Edit existing todos (update title and due date)
- Delete todos
- Mark todos as complete/incomplete (checkbox)
- Todos are visually styled for light mode with Tailwind CSS
- Save button is disabled until valid input is provided
- All data is persisted using json-server (local REST API)

## Setup Instructions

### 1. Clone the repository

```
git clone <repo-url>
cd vanilla_js_todo
```

### 2. Install dependencies

```
npm install
```

### 3. Install and start json-server

```
npm install -g json-server
npm run json-server
```

This will start json-server at http://localhost:3000, serving your todos from `src/data/todos.json`.

### 4. Open the app

Open `index.html` in your browser (use a local server for module support, e.g. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## Usage

- Click "Add New Todo" to create a new todo. Enter a title and select a due date, then click Save.
- Click "Edit" on any todo to update its title or due date.
- Click "Delete" to remove a todo.
- Check/uncheck the box to mark a todo as complete/incomplete.

## Notes

- All CRUD operations (add, edit, delete) are performed via json-server.
- Each todo has a unique UUID, title, due date, and completion status.
- The UI is fully responsive and styled with Tailwind CSS.

## License

MIT
