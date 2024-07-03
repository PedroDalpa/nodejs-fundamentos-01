import { randomUUID } from 'crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import { validateStrings } from './utils/validateStrings.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { title, description } = req.query;
      let search = null;
      if (title !== undefined || description !== undefined) {
        search = { title, description };
      }
      const tasks = database.select('tasks', search);

      return res.end(JSON.stringify({ tasks }));
    },

    // TODO: filter by name and description
  },
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { title, description } = req.body;

      const dataIsValid = validateStrings([title, description]);

      if (!dataIsValid) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ msg: 'Invalid payload' }));
      }

      database.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      const titleIsValid = validateStrings([title]);
      const descriptionIsValid = validateStrings([description]);

      if (!titleIsValid & !descriptionIsValid) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ msg: 'Invalid payload' }));
      }

      const findTask = database.update('tasks', {
        id,
        title,
        description,
      });

      if (!findTask) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ msg: 'Task not found' }));
      }

      return res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/task/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const findTask = database.delete('tasks', id);

      if (!findTask) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ msg: 'Task not found' }));
      }

      return res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/task/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const findTask = database.complete('tasks', { id });

      if (!findTask) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ msg: 'Task not found' }));
      }

      return res.writeHead(204).end();
    },
  },
];
