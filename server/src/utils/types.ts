export type User = {
  email: string;
  passwd: string;
  passwd2: string;
};

export type InfoMsg = {
  style?: string;
  message?: string | null;
};

export type LoginCredentials = {
  email: string;
  passwd: string;
};
