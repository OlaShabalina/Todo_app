// Read existing todos from the local storage

const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos');

    if (todosJSON !== null) {
        return JSON.parse(todosJSON);
    } else {
        return [];
    };
};

// Save todos to local storage

const saveTodos = function () {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render (filter) todos

const renderTodos = function (todos, filters) {
    let filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });

    document.querySelector('#todos').innerHTML = '';

    let incompletedTodo = filteredTodos.filter((todo) => {
        return !todo.completed
    });
    
    document.querySelector('#todos').appendChild(generateSummeryDOM(incompletedTodo));

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    });
}

//  Generate todo DOM

const generateTodoDOM = function (todo) {
    let newParagraph = document.createElement('p');
    newParagraph.textContent = todo.text;
    return newParagraph;
}

//  Get DOM elements to list summary

const generateSummeryDOM = function(incompletedTodo) {
    let totalPhrase = document.createElement('h2');
    totalPhrase.textContent = `You have ${incompletedTodo.length} todos left`;
    return totalPhrase;
}