export type UserEntity = {
  id: string; // maps to id_usuario
  fkGerente?: string | null;
  fkGestorFundo?: string | null;
  email: string;
  passwordHash: string; // hashed senha
  isAdm: boolean;
  createdAt?: Date;
};

export interface IUserRepository {
  create(user: Omit<UserEntity, 'id' | 'createdAt'>): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
