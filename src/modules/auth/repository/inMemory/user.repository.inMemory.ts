import { IUserRepository, UserEntity } from '../interfaces/iUserRepository';
import { v4 as uuid } from 'uuid';

export class UserRepositoryInMemory implements IUserRepository {
  private store = new Map<string, UserEntity>();

  async create(user: Omit<UserEntity, 'id' | 'createdAt'>): Promise<UserEntity> {
    const id = uuid();
    const entity: UserEntity = {
      id,
      fkGerente: user.fkGerente ?? null,
      fkGestorFundo: user.fkGestorFundo ?? null,
      email: user.email,
      passwordHash: user.passwordHash,
      isAdm: user.isAdm ?? false,
      createdAt: new Date(),
    };
    this.store.set(id, entity);
    return entity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    for (const u of this.store.values()) {
      if (u.email === email) return u;
    }
    return null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.store.get(id) ?? null;
  }

  // helpers for tests
  reset() {
    this.store.clear();
  }

  seed(users: UserEntity[]) {
    this.reset();
    for (const u of users) this.store.set(u.id, u);
  }
}
