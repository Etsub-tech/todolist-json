import { fetchTasks, updateTask, deleteTask } from './api.js';
import { state, setTasks, setEditId } from './state.js';
import { renderTasks } from './ui.js';
import { filterAndSort } from './filters.js';
import { registerEvents } from './events.js';
import { loadTheme, toggleTheme } from './theme.js';

const container = document.getElementById('tasksContainer');

async function init() {
    loadTheme();
    registerEvents();

    document.getElementById('themeToggle')
        .addEventListener('click', toggleTheme);

    const tasks = await fetchTasks();
    setTasks(tasks);

    const filtered = filterAndSort(state.tasks, {
        search: '',
        category: '',
        sort: 'id_desc'
    });

    renderTasks(container, filtered);
}

init();

/* ===== GLOBAL FUNCTIONS (needed for onclick) ===== */

window.toggleComplete = async function (id) {
    const task = state.tasks.find(t => t.id === id);
    await updateTask(id, { completed: !task.completed });
    location.reload();
};

window.removeTask = async function (id) {
    await deleteTask(id);
    location.reload();
};

window.editTask = function (id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;

    setEditId(id);

    taskTitle.value = task.title;
    taskDescription.value = task.description || '';
    taskCategory.value = task.category;
    taskDueDate.value = task.dueDate || '';
};
