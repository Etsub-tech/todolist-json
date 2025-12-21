import { createTask } from './api.js';
import { state, setEditId } from './state.js';

export function registerEvents() {
    document.getElementById('taskForm').addEventListener('submit', async e => {
        e.preventDefault();

        const title = taskTitle.value.trim();
        if (!title) return alert('Title is required');

        const task = {
            title,
            description: taskDescription.value,
            category: taskCategory.value,
            dueDate: taskDueDate.value || null,
            completed: false
        };

        if (state.editId) {
            // handled in main.js
            return;
        }

        await createTask(task);
        location.reload();
    });
}
