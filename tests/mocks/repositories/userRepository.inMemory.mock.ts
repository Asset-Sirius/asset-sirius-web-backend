import { UserRepositoryInMemory } from '../../../src/modules/auth/repository/inMemory/user.repository.inMemory';
import { makeUser } from '../factories/user.factory';

export function makeUserRepositorySeeded(overrides?: any) {
  const repo = new UserRepositoryInMemory();
  const u = makeUser(overrides);
  repo.seed([u]);
  return { repo, seeded: u };
}
