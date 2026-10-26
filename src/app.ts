import express from 'express';
import { json } from 'express';
import cors from 'cors';
import authModule from './modules/auth';
import pool from './db';

export function createApp() {
  const app = express();
  app.use(json());

  // enable CORS; allow specific origin via FRONTEND_ORIGIN or allow all for development
  const origin = process.env.FRONTEND_ORIGIN || '*';
  app.use(cors({ origin }));

  // mount api routes
  app.use('/api/auth', authModule);

  // health route that actually tests DB connectivity
  app.get('/api/health', async (_req, res) => {
    try {
      await pool.query('SELECT 1');
      res.status(200).json({ status: 'ok', db: 'connected' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Falha ao consultar o banco:', (err as Error).message);
      res.status(500).json({ status: 'error', db: 'unreachable' });
    }
  });

  return app;
}

export default createApp;
