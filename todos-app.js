let todos = [];

const filters = {
    searchText: '',
    hideCompleted: false
}

const todosJSON = localStorage.getItem('todos');

if (todosJSON !== null) {
    todos = JSON.parse(todosJSON);
}


const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });

    document.querySelector('#todos').innerHTML = '';

    let totalPhrase = document.createElement('h2');
    let incompletedTodo = filteredTodos.filter((todo) => {
        return !todo.completed
    });

    totalPhrase.textContent = `You have ${incompletedTodo.length} todos left`;
    document.querySelector('#todos').appendChild(totalPhrase);

    filteredTodos.forEach((todo) => {
        let newParagraph = document.createElement('p');
        newParagraph.textContent = todo.text;
        document.querySelector('#todos').appendChild(newParagraph);
    });
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input' , (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    todos.push({
        text: e.target.elements.addTodo.value,
        completed: false
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos, filters);
    e.target.elements.addTodo.value = '';
})

// hide completed todo checkbox

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
})