import 'core-js';
import 'isomorphic-fetch';

import { createApp } from './app';
import { PORT } from '../../config';

createApp().listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${PORT}...`);
});
