import express, { Request, Response } from 'express';
import next from 'next';
import httpProxy from 'http-proxy';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    const proxy = httpProxy.createProxyServer({});

    server.get('/google', (req: Request, res: Response) => {
      proxy.web(req, res, {
        target: 'https://github.com/http-party/node-http-proxy',
        changeOrigin: true,
      });
    });

    // server.all('/backstage/', (req: Request, res: Response) =>
    //   handle(req, res)
    // );

    server.all('*', (req: Request, res: Response) => handle(req, res));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
