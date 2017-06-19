import { createApp } from './';
import * as supertest from 'supertest';

describe('server', () => {
  // this is an example of an integration test using supertest
  describe('/_healthcheck', () => {
    it('returns 200', async () => {
      await supertest(createApp())
        .get('/_healthcheck')
        .expect(200);
    });
  });

  // this is an example of mocking a global using jest
  describe('/api/fetch_clever_website', () => {
    it('returns the Clever website', async () => {
      const mockBody = 'hello world!';

      // you can just replace globals with mocks directly since each
      // test is sandboxed. Casted global to allow modifying it
      (global as any).fetch = jest.fn().mockImplementation(async () => (
        { text: async () => mockBody }
      ));

      await supertest(createApp())
        .get('/api/fetch_clever_website')
        .expect(200)
        .expect(mockBody);
    });
  });
});
