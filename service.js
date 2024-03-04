const uuid = require('uuid');

const todos = [
  {
    id: uuid.v4(),
    title: 'lunch',
    description: 'Go for lunc by 2pm',
  },
  {
    id: uuid.v4(),
    title: 'dinner',
    description: 'Go for dinner by 8pm',
  },
];

const todoService = {
  getTodos: () => {
    return todos;
  },
  deleteTodos: () => {
    todos.length = 0;
  },
  addTodo: (title, description) => {
    const newTodo = {
      id: uuid.v4(),
      title,
      description,
    };

    todos.push(newTodo);
    return newTodo;
  },
  deleteTodo: (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }

    todos.splice(index, 1);
    return true;
  },
  updateTodo: (id, title, description) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return false;
    }

    todo.title = title;
    todo.description = description;
    return true;
  },
};

module.exports = {
  todoService,
};
