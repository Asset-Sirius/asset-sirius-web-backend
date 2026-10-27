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
  // Basic request logging for diagnostics (avoid sensitive data leakage)
  console.log(`[auth][register] incoming request - time=${new Date().toISOString()} route=/register bodyKeys=${Object.keys(req.body).join(',')}`);
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
