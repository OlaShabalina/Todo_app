let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input' , (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    todos.push({
        text: e.target.elements.addTodo.value,
        completed: false
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.addTodo.value = '';
})

// hide completed todo checkbox

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
})