const http = require('http');
const resHandle = require('./resHandle');
const { todoService } = require('./service');

const server = http.createServer((req, res) => {
  if (req.url === '/todos' && req.method === 'GET') {
    const todos = todoService.getTodos();
    resHandle(res, 200, 'Todos retrieved successfully', todos);
    return;
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    todoService.deleteTodos();
    resHandle(res, 200, 'Todos deleted successfully');
    return;
  } else if (req.url === '/todo' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { title, description } = JSON.parse(body);

        if (!title || !description) {
          resHandle(res, 400, 'Title and description are required');
          return;
        }

        const newTodo = todoService.addTodo(title, description);

        resHandle(res, 201, 'Todo added successfully', newTodo);
        return;
      } catch (error) {
        console.log(error);
        resHandle(res, 400, 'Invalid JSON');
        return;
      }
    });
  } else if (req.url.startsWith('/todo/') && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    const isDeleted = todoService.deleteTodo(id);

    if (isDeleted) {
      resHandle(res, 200, 'Todo deleted successfully');
      return;
    }

    resHandle(res, 404, 'Todo not found');
    return;
  } else if (req.url.startsWith('/todo/') && req.method === 'PATCH') {
    const id = req.url.split('/')[2];
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { title, description } = JSON.parse(body);

        if (!title || !description) {
          resHandle(res, 400, 'Title and description are required');
          return;
        }

        const isUpdated = todoService.updateTodo(id, title, description);

        if (isUpdated) {
          resHandle(res, 200, 'Todo updated successfully');
          return;
        }

        resHandle(res, 404, 'Todo not found');
        return;
      } catch (error) {
        console.log(error);
        resHandle(res, 400, 'Invalid JSON');
        return;
      }
    });
  } else {
    resHandle(res, 404, 'Route not found');
    return;
  }
});

server.listen(3005);
console.log('Server running at http://localhost:3005/');
