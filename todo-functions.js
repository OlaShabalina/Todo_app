// Read existing todos from the local storage

const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

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

// Checkbox setting - complete todo once checked
    const toggleTodo = function (id) {
        const todo = todos.find((todo) => {
            return todo.id === id;
        });

        if (todo !== undefined) {
            todo.completed = !todo.completed;
        }
    };

// Function to remove todo 

const removeTodo = function (id) {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id;
    });
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

//  Generate todo DOM

const generateTodoDOM = function (todo) {
    let todoContainer = document.createElement('div');
    let todoCheckbox = document.createElement('input');
    let todoText = document.createElement('span');
    let removeTodoButton = document.createElement('button');


    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.checked = todo.completed;
    todoContainer.appendChild(todoCheckbox);
    todoCheckbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        saveTodos();
        renderTodos(todos, filters);
    })

    todoText.textContent = todo.text;
    todoContainer.appendChild(todoText);

    removeTodoButton.textContent = 'x';
    todoContainer.appendChild(removeTodoButton);
    removeTodoButton.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos();
        renderTodos(todos, filters);
    })

    return todoContainer;
}

//  Get DOM elements to list summary

const generateSummeryDOM = function(incompletedTodo) {
    let totalPhrase = document.createElement('h2');
    totalPhrase.textContent = `You have ${incompletedTodo.length} todos left`;
    return totalPhrase;
}