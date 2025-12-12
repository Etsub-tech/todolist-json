# To-Do Application with JSON Server

A modern, feature-rich To-Do application that uses JSON Server as a backend API.

## Features

### Core Functionality
- ✅ Add tasks with title, description, category, and due date
- ✅ Display all tasks in a beautiful card-based layout
- ✅ Mark tasks as completed/incomplete (updates JSON Server)
- ✅ Edit existing tasks (updates JSON Server)
- ✅ Delete tasks (removes from backend and UI)

### Advanced Features
- 🔍 **Search**: Real-time search through task titles and descriptions
- 🏷️ **Category Filter**: Filter tasks by category (Work, Personal, Shopping, Health, Other)
- 📊 **Sorting**: Sort by newest/oldest, due date, or title (A-Z/Z-A)
- 🌙 **Dark Theme**: Toggle between light and dark modes (persists in localStorage)

## Getting Started

### Prerequisites
- Node.js and npm installed on your system

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start JSON Server:
```bash
npm start
```

The JSON Server will run on `http://localhost:3000`

3. Open `index.html` in your web browser

## API Endpoints

The application uses the following JSON Server endpoints:

- `GET /todos` - Load all tasks
- `POST /todos` - Create a new task
- `PATCH /todos/:id` - Update a specific task
- `DELETE /todos/:id` - Delete a specific task

## Project Structure

```
todolist-json/
├── index.html      # Main HTML file
├── styles.css      # Styling and themes
├── script.js       # Application logic and API calls
├── db.json         # JSON Server database
├── package.json    # Dependencies and scripts
└── README.md       # This file
```

## Usage

1. **Add a Task**: Fill in the form with task details and click "Add Task"
2. **Complete a Task**: Click the "Complete" button on any task card
3. **Edit a Task**: Click the "Edit" button, modify the form, and click "Update Task"
4. **Delete a Task**: Click the "Delete" button and confirm
5. **Search**: Type in the search box to filter tasks
6. **Filter by Category**: Select a category from the dropdown
7. **Sort**: Choose a sorting option from the sort dropdown
8. **Toggle Theme**: Click the moon/sun icon in the header

## Notes

- Make sure JSON Server is running before using the application
- All data persists in `db.json`
- Theme preference is saved in browser localStorage
- The application is fully responsive and works on mobile devices

