import createApp from './app';
import pool from './db';

const app = createApp();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

// perform a startup check against the database and fail fast if unreachable
(async () => {
  try {
    await pool.query('SELECT 1');
    // eslint-disable-next-line no-console
    console.log(
      `Conectado ao banco ${process.env.DB_NAME} em ${process.env.DB_HOST}`,
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Falha ao conectar ao banco na inicialização:', (err as Error).message);
    process.exit(1);
  }

  app.listen(PORT, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`Backend na porta ${PORT}`);
  });
})();
