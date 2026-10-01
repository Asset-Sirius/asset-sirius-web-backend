export type AuthResponse = {
  accessToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    isAdm: boolean;
    fkGerente?: string | null;
    fkGestorFundo?: string | null;
  };
};
