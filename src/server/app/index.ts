import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as kayvee from 'kayvee';
import * as discovery from 'clever-discovery';

export function createApp() {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '..', '..', '..', '__build')));

  // Etags aren't properly handled by all browsers so we outright disable all caching on
  // our API methods.
  app.use((req, res, next) => {
    res.header('Cache-Control', 'no-cache');
    next();
  });

  app.get('/_healthcheck', (req, res) => {
    res.sendStatus(200);
  });

  // TODO: add endpoints here!

  // TODO: remove this endpoint and its associated test.
  // This endpoint is only here to demonstrate how to mock fetch in
  // index.test.ts.
  app.get('/api/fetch_clever_website', async (req, res) => {
    const resp = await fetch('https://clever.com');
    const text = await resp.text();
    res.send(text);
  });

  // catch-all route to serve the UI, if no API endpoints above match.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'ui', 'index.html'));
  });

  return app;
}