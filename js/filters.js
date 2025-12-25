export function filterAndSort(tasks, options) {
    let result = [...tasks];

    if (options.search) {
        result = result.filter(t =>
            t.title.toLowerCase().includes(options.search) ||
            (t.description || '').toLowerCase().includes(options.search)
        );
    }

    if (options.category) {
        result = result.filter(t => t.category === options.category);
    }

    const [field, order] = options.sort.split('_');

    result.sort((a, b) => {
        let A = a[field] || '';
        let B = b[field] || '';

        if (field === 'dueDate') {
            A = A ? new Date(A) : Infinity;
            B = B ? new Date(B) : Infinity;
        }

        return order === 'asc' ? A > B : A < B;
    });

    return result;
}
