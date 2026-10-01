import { Router, Request, Response } from 'express';
import AuthService from '../service/auth.service';
import { UserRepositoryInMemory } from '../repository/inMemory/user.repository.inMemory';
import { RegisterRequest } from '../dto/register.request';
import { LoginRequest } from '../dto/login.request';

// create a default router with in-memory repo for now
const router = Router();
const userRepo = new UserRepositoryInMemory();
const authService = new AuthService(userRepo);

router.post('/register', async (req: Request, res: Response) => {
  const body = req.body as RegisterRequest;
  try {
    const out = await authService.register(body);
    return res.status(201).json(out);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const body = req.body as LoginRequest;
  try {
    const out = await authService.login(body);
    return res.status(200).json(out);
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

export default router;
