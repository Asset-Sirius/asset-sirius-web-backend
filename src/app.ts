import express from 'express';
import { json } from 'express';
import authModule from './modules/auth/index.ts';

export function createApp() {
  const app = express();
  app.use(json());

  // mount api routes
  app.use('/api/auth', authModule);

  // health
  app.get('/api/health', (_req, res) => res.json({ ok: true }));

  return app;
}

export default createApp;
