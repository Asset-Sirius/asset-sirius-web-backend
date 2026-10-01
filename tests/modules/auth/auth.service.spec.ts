import { UserRepositoryInMemory } from '../../../src/modules/auth/repository/inMemory/user.repository.inMemory';
import { makeUser } from '../../mocks/factories/user.factory';
import AuthService from '../../../src/modules/auth/service/auth.service';

jest.mock('bcryptjs');
jest.mock('../../../src/shared/utils/jwt', () => ({
  sign: jest.fn(() => 'token:mock'),
  verify: jest.fn(() => ({ sub: 'any' })),
  expiresInSeconds: jest.fn(() => 3600),
}));

describe('AuthService', () => {
  let repo: UserRepositoryInMemory;
  let service: AuthService;

  beforeEach(() => {
    repo = new UserRepositoryInMemory();
    service = new AuthService(repo);
  });

  it('registers a new user and returns token', async () => {
    const dto = { email: 'a@b.com', password: 'secret' };
    const res = await service.register(dto as any);
    expect(res.accessToken).toBe('token:mock');
    const stored = await repo.findByEmail(dto.email);
    expect(stored).not.toBeNull();
    expect(stored!.passwordHash).toBe('hashed:secret');
  });

  it('throws when email already exists', async () => {
    const existing = makeUser({ email: 'ex@ex.com', passwordHash: 'hashed:x' });
    repo.seed([existing]);
    await expect(service.register({ email: 'ex@ex.com', password: 'x' } as any)).rejects.toThrow();
  });

  it('logs in with valid credentials', async () => {
    const hashed = 'hashed:pass';
    const user = makeUser({ email: 'login@t.com', passwordHash: hashed });
    repo.seed([user]);
    const res = await service.login({ email: 'login@t.com', password: 'pass' } as any);
    expect(res.accessToken).toBe('token:mock');
  });

  it('throws on invalid login', async () => {
    await expect(service.login({ email: 'no@no.com', password: 'x' } as any)).rejects.toThrow();
  });
});
