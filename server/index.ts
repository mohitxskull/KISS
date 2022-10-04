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

    server.get('/proxy-test', (req: Request, res: Response) => {
      proxy.web(req, res, {
        target: 'https://busy-teal-sockeye-boot.cyclic.app/',
        changeOrigin: true,
      });
    });

    // server.all('/backstage/', (req: Request, res: Response) =>
    //   handle(req, res)
    // );

    server.all('*', (req: Request, res: Response) => handle(req, res));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`\n\nhttp://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
