import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as path from 'path';
// import * as discovery from "clever-discovery";

import { PORT } from '../../config';

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', '..', '__build')));

// Etags aren't properly handled by all browsers so we outright disable all caching on
// our API methods.
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache');
  next();
});

app.get('/_healthcheck', (req, res) => {
  res.sendStatus(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${PORT}...`);
});
