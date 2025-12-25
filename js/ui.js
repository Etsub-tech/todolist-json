import { escapeHtml } from './utils.js';

export function renderTasks(container, tasks) {
    if (!tasks.length) {
        container.innerHTML = '<p class="empty-message">No tasks found</p>';
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="task-card ${task.completed ? 'completed' : ''}">
            <h3>${escapeHtml(task.title)}</h3>
            ${task.description ? `<p>${escapeHtml(task.description)}</p>` : ''}
            <p>📅 ${task.dueDate || 'No due date'}</p>

            <div class="task-actions">
                <button onclick="toggleComplete('${task.id}')">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onclick="editTask('${task.id}')">Edit</button>
                <button onclick="removeTask('${task.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}
