import { randomUUID } from 'crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const tasks = database.select('tasks');

      return res.end(JSON.stringify({ tasks }));
    },

    // TODO: filter by name and description
  },
  {
    method: 'POST',
    path: buildRoutePath('/task'),
    handler: (req, res) => {
      const { title, description } = req.body;

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

      const findData = database.update('tasks', {
        id,
        title,
        description,
        updated_at: new Date(),
      });

      if (!findData) {
        return res.writeHead(404).end();
      }

      return res.writeHead(204).end();
    },
  },
];
