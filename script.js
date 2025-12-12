const API_URL = 'http://localhost:3000/todos';

let currentEditId = null;
let allTasks = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
    loadTheme();
});

// Setup event listeners
function setupEventListeners() {
    const form = document.getElementById('taskForm');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortSelect = document.getElementById('sortSelect');
    const cancelBtn = document.getElementById('cancelBtn');
    const themeToggle = document.getElementById('themeToggle');

    form.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', filterAndSortTasks);
    categoryFilter.addEventListener('change', filterAndSortTasks);
    sortSelect.addEventListener('change', filterAndSortTasks);
    cancelBtn.addEventListener('click', cancelEdit);
    themeToggle.addEventListener('click', toggleTheme);
}

// Theme management
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// API Functions
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to load tasks');
        allTasks = await response.json();
        filterAndSortTasks();
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError('Failed to load tasks. Make sure JSON Server is running.');
    }
}

async function createTask(task) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error('Failed to create task');
        return await response.json();
    } catch (error) {
        console.error('Error creating task:', error);
        showError('Failed to create task.');
        throw error;
    }
}

async function updateTask(id, updates) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update task');
        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Failed to update task.');
        throw error;
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete task');
        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Failed to delete task.');
        throw error;
    }
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const category = document.getElementById('taskCategory').value;
    const dueDate = document.getElementById('taskDueDate').value;

    if (!title) {
        showError('Title is required');
        return;
    }

    const taskData = {
        title,
        description,
        category,
        dueDate: dueDate || null,
        completed: false,
    };

    if (currentEditId) {
        updateTask(currentEditId, taskData)
            .then(() => {
                resetForm();
                loadTasks();
            });
    } else {
        createTask(taskData)
            .then(() => {
                resetForm();
                loadTasks();
            });
    }
}

function resetForm() {
    document.getElementById('taskForm').reset();
    currentEditId = null;
    document.getElementById('formTitle').textContent = 'Add New Task';
    document.getElementById('submitBtn').textContent = 'Add Task';
    document.getElementById('cancelBtn').style.display = 'none';
}

function cancelEdit() {
    resetForm();
}

function editTask(id) {
    const task = allTasks.find(t => t.id === id);
    if (!task) return;

    currentEditId = id;
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description || '';
    document.getElementById('taskCategory').value = task.category || 'other';
    document.getElementById('taskDueDate').value = task.dueDate || '';
    document.getElementById('formTitle').textContent = 'Edit Task';
    document.getElementById('submitBtn').textContent = 'Update Task';
    document.getElementById('cancelBtn').style.display = 'inline-block';
    
    // Scroll to form
    document.querySelector('.task-form-section').scrollIntoView({ behavior: 'smooth' });
}

// Task actions
async function toggleComplete(id) {
    const task = allTasks.find(t => t.id === id);
    if (!task) return;

    try {
        await updateTask(id, { completed: !task.completed });
        loadTasks();
    } catch (error) {
        // Error already handled in updateTask
    }
}

async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        await deleteTask(id);
        loadTasks();
    } catch (error) {
        // Error already handled in deleteTask
    }
}

// Filtering and sorting
function filterAndSortTasks() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortValue = document.getElementById('sortSelect').value;

    let filtered = [...allTasks];

    // Apply search filter
    if (searchQuery) {
        filtered = filtered.filter(task => 
            task.title.toLowerCase().includes(searchQuery) ||
            (task.description && task.description.toLowerCase().includes(searchQuery))
        );
    }

    // Apply category filter
    if (categoryFilter) {
        filtered = filtered.filter(task => task.category === categoryFilter);
    }

    // Apply sorting
    const [sortField, sortOrder] = sortValue.split('_');
    filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) aValue = '';
        if (bValue === null || bValue === undefined) bValue = '';

        // Handle date sorting
        if (sortField === 'dueDate') {
            if (!aValue && !bValue) return 0;
            if (!aValue) return 1;
            if (!bValue) return -1;
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        }

        // Handle string comparison
        if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
    });

    displayTasks(filtered);
}

// Display tasks
function displayTasks(tasks) {
    const container = document.getElementById('tasksContainer');
    
    if (tasks.length === 0) {
        container.innerHTML = '<p class="empty-message">No tasks found. Try adjusting your filters!</p>';
        return;
    }

    container.innerHTML = tasks.map(task => createTaskCard(task)).join('');
}

function createTaskCard(task) {
    const dueDate = task.dueDate ? new Date(task.dueDate) : null;
    const isOverdue = dueDate && dueDate < new Date() && !task.completed;
    const dueDateFormatted = dueDate ? dueDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    }) : 'No due date';

    return `
        <div class="task-card ${task.completed ? 'completed' : ''}">
            <div class="task-header">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
            </div>
            ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
            <div class="task-meta">
                <span class="task-category ${task.category || 'other'}">${task.category || 'other'}</span>
                <span class="task-due-date ${isOverdue ? 'overdue' : ''}">
                    📅 ${dueDateFormatted}
                </span>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? '↩️ Mark Incomplete' : '✓ Complete'}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">✏️ Edit</button>
                <button class="delete-btn" onclick="handleDelete(${task.id})">🗑️ Delete</button>
            </div>
        </div>
    `;
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    alert(message); // In a production app, you'd use a better notification system
}

