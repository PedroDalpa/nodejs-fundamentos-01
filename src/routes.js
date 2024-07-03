import { Database } from './database.js';
const database = new Database();

export const routes = [
  {
    method: 'GET',
    url: '/task',
    handler: (req, res) => {
      const tasks = database.select('tasks');

      return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify({ tasks }));
    },
  },
];
