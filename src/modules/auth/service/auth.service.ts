import { IUserRepository, UserEntity } from '../repository/interfaces/iUserRepository';
import { RegisterRequest } from '../dto/register.request';
import { LoginRequest } from '../dto/login.request';
import { AuthResponse } from '../dto/auth.response';
import bcrypt from 'bcryptjs';
import * as jwtUtil from '../../../shared/utils/jwt';

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  async register(dto: RegisterRequest): Promise<AuthResponse> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const created = await this.userRepo.create({
      email: dto.email,
      passwordHash,
      fkGerente: dto.fkGerente ?? null,
      fkGestorFundo: dto.fkGestorFundo ?? null,
      isAdm: false,
    });

    const token = jwtUtil.sign({ sub: created.id, email: created.email });

    return {
      accessToken: token,
      expiresIn: jwtUtil.expiresInSeconds(),
      user: {
        id: created.id,
        email: created.email,
        isAdm: created.isAdm,
        fkGerente: created.fkGerente,
        fkGestorFundo: created.fkGestorFundo,
      },
    };
  }

  async login(dto: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.passwordHash);
    if (!match) throw new Error('Invalid credentials');

    const token = jwtUtil.sign({ sub: user.id, email: user.email });
    return {
      accessToken: token,
      expiresIn: jwtUtil.expiresInSeconds(),
      user: {
        id: user.id,
        email: user.email,
        isAdm: user.isAdm,
        fkGerente: user.fkGerente,
        fkGestorFundo: user.fkGestorFundo,
      },
    };
  }
}

export default AuthService;
