export const state = {
    tasks: [],
    editId: null
};

export function setTasks(tasks) {
    state.tasks = tasks;
}

export function setEditId(id) {
    state.editId = id;
}
