import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1h';

export function sign(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verify(token: string): any {
  return jwt.verify(token, SECRET);
}

export function expiresInSeconds(): number {
  // simplistic parse for common formats like '1h' -> 3600
  if (EXPIRES_IN.endsWith('h')) {
    const hours = Number(EXPIRES_IN.slice(0, -1));
    return hours * 3600;
  }
  if (EXPIRES_IN.endsWith('m')) {
    const mins = Number(EXPIRES_IN.slice(0, -1));
    return mins * 60;
  }
  return 3600;
}
