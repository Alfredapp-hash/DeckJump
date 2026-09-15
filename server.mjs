import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const routes = {'/':'index.html','/src/app.js':'src/app.js','/src/takeoff.js':'src/takeoff.js','/src/styles.css':'src/styles.css'};
const types = {html:'text/html',js:'text/javascript',css:'text/css'};
export const server = createServer(async (req,res) => {
  const path = routes[new URL(req.url, 'http://localhost').pathname];
  if (!path || !['GET','HEAD'].includes(req.method)) { res.writeHead(404); res.end('Not found'); return; }
  try {
    const body = await readFile(new URL(path, import.meta.url));
    res.writeHead(200, {'Content-Type':types[path.split('.').pop()]+'; charset=utf-8','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"});
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(500); res.end('Unable to load app'); }
});
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log('DeckJump ready on http://127.0.0.1:' + server.address().port));
