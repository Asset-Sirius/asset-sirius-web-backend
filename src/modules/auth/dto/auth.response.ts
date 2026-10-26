export type AuthResponse = {
  user: {
    id: string;
    email: string;
    isAdm: boolean;
    fkGerente?: string | null;
    fkGestorFundo?: string | null;
  };
};
