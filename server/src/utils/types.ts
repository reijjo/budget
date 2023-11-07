export type InfoMsg = {
  style?: string;
  message?: string | null;
};

export type LoginCredentials = {
  email: string;
  passwd: string;
};

export type RegisterInfo = LoginCredentials & {
  passwd2: string;
};

export type Logged = {
  token: string;
  email: string;
};

export type Token = {
  id: string;
  email: string;
  iat: number;
};
