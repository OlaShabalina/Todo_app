'use strict'

// Read existing todos from the local storage

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON !== null ? JSON.parse(todosJSON) : [];
    } catch (err) {
        return [];
    }
}

// Save todos to local storage

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Render (filter) todos

const renderTodos = (todos, filters) => {
    let filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

        return searchTextMatch && hideCompletedMatch;
    });

    document.querySelector('#todos').innerHTML = '';

    let incompletedTodo = filteredTodos.filter((todo) => !todo.completed);
    
    document.querySelector('#todos').appendChild(generateSummeryDOM(incompletedTodo));

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    });
}

// Checkbox setting - complete todo once checked
    const toggleTodo = (id) => {
        const todo = todos.find((todo) => todo.id === id);

        if (todo) {
            todo.completed = !todo.completed;
        }
    };

// Function to remove todo 

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

//  Generate todo DOM

const generateTodoDOM = (todo) => {
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

    removeTodoButton.textContent = 'delete';
    todoContainer.appendChild(removeTodoButton);
    removeTodoButton.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos();
        renderTodos(todos, filters);
    })

    return todoContainer;
}

//  Get DOM elements to list summary

const generateSummeryDOM = (incompletedTodo) => {
    let totalPhrase = document.createElement('h2');
    totalPhrase.textContent = `You have ${incompletedTodo.length} todos left`;
    return totalPhrase;
}