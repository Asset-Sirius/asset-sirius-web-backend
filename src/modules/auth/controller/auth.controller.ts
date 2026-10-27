import { Router, Request, Response } from 'express';
import AuthService from '../service/auth.service';
import { UserRepositoryMySQL } from '../repository/mysql/user.repository.mysql';
import { RegisterRequest } from '../dto/register.request';
import { LoginRequest } from '../dto/login.request';

// create a default router with MySQL-backed repository
const router = Router();
const userRepo = new UserRepositoryMySQL();
const authService = new AuthService(userRepo);

router.post('/register', async (req: Request, res: Response) => {
  const body = req.body as RegisterRequest;
  // Basic validation: require email and password
  if (!body || !body.email || !body.password) {
    const keys = req.body && typeof req.body === 'object' ? Object.keys(req.body).join(',') : 'none';
    console.warn(`[auth][register] bad request - missing email or password - bodyKeys=${keys}`);
    return res.status(400).json({ message: 'Missing email or password' });
  }

  // Log incoming register attempt - mask password
  const maskedPassword = body.password ? '***' : 'null';
  console.log(`[auth][register] incoming request - time=${new Date().toISOString()} route=/register email=${body.email} password=${maskedPassword}`);
  try {
    const out = await authService.register(body);
    console.log(`[auth][register] success - userId=${out.user?.id ?? 'unknown'}`);
    return res.status(201).json(out);
  } catch (err: any) {
    console.error(`[auth][register] error - message=${err?.message} stack=${err?.stack}`);
    return res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const body = req.body as LoginRequest;
  // Basic validation: require email and password
  if (!body || !body.email || !body.password) {
    console.warn(`[auth][login] bad request - missing email or password - bodyKeys=${Object.keys(req.body).join(',')}`);
    return res.status(400).json({ message: 'Missing email or password' });
  }
  // Log incoming login attempt - mask password
  const maskedPassword = body.password ? '***' : 'null';
  console.log(`[auth][login] incoming request - time=${new Date().toISOString()} route=/login email=${body.email} password=${maskedPassword}`);
  try {
    const out = await authService.login(body);
    console.log(`[auth][login] success - userId=${out.user?.id ?? 'unknown'}`);
    return res.status(200).json(out);
  } catch (err: any) {
    console.error(`[auth][login] error - message=${err?.message} stack=${err?.stack}`);
    return res.status(401).json({ message: err.message });
  }
});

export default router;
