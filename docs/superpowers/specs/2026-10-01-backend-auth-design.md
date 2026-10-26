# Backend Auth Design (initial)

Date: 2026-10-01

Overview
- Express + TypeScript backend skeleton for authentication (JWT) with DB-agnostic repository pattern.
- Modules are domain-scoped; DTOs live inside each module.
- For now repository implementations are in-memory; later we'll add RDS integration via an ORM implementation.

Decisions
- DB-agnostic: IUserRepository interface + in-memory implementation.
- Authentication tokens removed (no JWT used in this design).
- Passwords: hashed with bcryptjs; database column needs to accept bcrypt hashes (VARCHAR(255)).
- Token storage on frontend: sessionStorage (note: vulnerable to XSS; recommend HttpOnly cookie later).

Schema mapping notes
- DB table `usuario` columns: id_usuario (BIGINT), fk_gerente, fk_gestor_fundo, email, senha, is_adm.
- Application model uses camelCase and safer types (id: string, isAdm: boolean, passwordHash: string).
- When integrating with RDS/ORM, map types appropriately and ensure senha column is large enough for bcrypt hashes.

Routes
- POST /api/auth/register
  - Body: { email, password, fkGerente?, fkGestorFundo? }
- Response: { user }
- POST /api/auth/login
  - Body: { email, password }
- Response: { user }

Testing
- Jest + ts-jest
- Mocks: in-memory repository, jest mocks for bcryptjs
- Tests included for AuthService (register/login) and can be extended for controller tests.

How to run (local dev)
1. copy .env as needed for DB or other secrets
2. npm install
3. npm run dev
4. npm test

Next steps
- Implement ORM-backed repository (Prisma/TypeORM) and migrations to map to RDS.
- Consider switching token storage to HttpOnly cookie for safety.
