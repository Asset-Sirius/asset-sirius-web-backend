export type RegisterRequest = {
  email: string;
  password: string;
  fkGerente?: string | null;
  fkGestorFundo?: string | null;
};
