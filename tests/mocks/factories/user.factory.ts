import { v4 as uuid } from 'uuid';
import { UserEntity } from '../../../src/modules/auth/repository/interfaces/iUserRepository';

export function makeUser(overrides?: Partial<UserEntity>): UserEntity {
  return {
    id: overrides?.id ?? uuid(),
    fkGerente: overrides?.fkGerente ?? null,
    fkGestorFundo: overrides?.fkGestorFundo ?? null,
    email: overrides?.email ?? `user${Math.floor(Math.random() * 10000)}@example.com`,
    passwordHash: overrides?.passwordHash ?? 'hashed-password',
    isAdm: overrides?.isAdm ?? false,
    createdAt: overrides?.createdAt ?? new Date(),
  };
}
