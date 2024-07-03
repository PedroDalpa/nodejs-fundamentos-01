import http from 'http';
import { routes } from './routes.js';

const server = http.createServer((req, res) => {
  const { method, url } = req;

  const route = routes.find((route) => {
    return route.method === method && route.url === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3000, () => {
  console.info('server is running on port 3000');
});
