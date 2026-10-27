import { IUserRepository, UserEntity } from '../interfaces/iUserRepository';
import pool from '../../../../db';
import { v4 as uuid } from 'uuid';

export class UserRepositoryMySQL implements IUserRepository {
  async create(user: Omit<UserEntity, 'id' | 'createdAt'>): Promise<UserEntity> {
    const id = uuid();
    const fkGerente = user.fkGerente ?? null;
    const fkGestorFundo = user.fkGestorFundo ?? null;
    const isAdm = user.isAdm ?? false;

    // Insert into usuário table. Column names follow the existing DB spec in docs.
    // Log query and parameter summary for diagnostics (don't log password hash value)
    console.log(`[userRepo][create] executing insert - id=${id} email=${user.email} fkGerente=${fkGerente} fkGestorFundo=${fkGestorFundo} isAdm=${isAdm}`);
    await pool.execute(
      `INSERT INTO usuario
        (id_usuario, fk_gerente, fk_gestor_fundo, email, senha, is_adm)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, fkGerente, fkGestorFundo, user.email, user.passwordHash, isAdm]
    );

    return {
      id,
      fkGerente,
      fkGestorFundo,
      email: user.email,
      passwordHash: user.passwordHash,
      isAdm,
      createdAt: new Date(),
    };
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    // Log the upcoming query for debugging reasons
    console.log(`[userRepo][findByEmail] executing select - email=${email}`);
    const [rows]: any = await pool.execute(
      `SELECT
         id_usuario AS id,
         fk_gerente AS fkGerente,
         fk_gestor_fundo AS fkGestorFundo,
         email,
         senha AS passwordHash,
         is_adm AS isAdm
       FROM usuario WHERE email = ? LIMIT 1`,
      [email]
    );
    const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
    if (!row) return null;
    return {
      id: String(row.id),
      fkGerente: row.fkGerente ?? null,
      fkGestorFundo: row.fkGestorFundo ?? null,
      email: row.email,
      passwordHash: row.passwordHash,
      isAdm: Boolean(row.isAdm),
      createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    console.log(`[userRepo][findById] executing select - id=${id}`);
    const [rows]: any = await pool.execute(
      `SELECT
         id_usuario AS id,
         fk_gerente AS fkGerente,
         fk_gestor_fundo AS fkGestorFundo,
         email,
         senha AS passwordHash,
         is_adm AS isAdm
       FROM usuario WHERE id_usuario = ? LIMIT 1`,
      [id]
    );
    const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
    if (!row) return null;
    return {
      id: String(row.id),
      fkGerente: row.fkGerente ?? null,
      fkGestorFundo: row.fkGestorFundo ?? null,
      email: row.email,
      passwordHash: row.passwordHash,
      isAdm: Boolean(row.isAdm),
      createdAt: row.createdAt ? new Date(row.createdAt) : undefined,
    };
  }
}
