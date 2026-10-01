import { Request, Response, NextFunction } from 'express';
import * as jwtUtil from '../utils/jwt';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'];
  if (!auth || Array.isArray(auth)) return res.status(401).json({ message: 'Missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Invalid token' });
  const token = parts[1];
  try {
    const payload = jwtUtil.verify(token);
    // inject user id
    (req as any).userId = payload.sub ?? null;
    return next();
  } catch (err: any) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default jwtMiddleware;
