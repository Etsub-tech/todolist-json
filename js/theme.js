export function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.dataset.theme = theme;
}

export function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
}
