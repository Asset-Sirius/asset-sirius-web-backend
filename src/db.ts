import mysql from 'mysql2/promise';

const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  // clear message and fail fast if required env vars are missing
  // (do not include secrets in logs)
  // eslint-disable-next-line no-console
  console.error(`Variáveis de ambiente ausentes: ${missing.join(', ')}`);
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 10000,
  // enable ssl only when explicitly requested
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

export default pool;
