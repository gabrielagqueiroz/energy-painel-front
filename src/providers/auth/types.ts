import { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export type UserProps = {
  email: string;
  password: string;
};

export type UserStorage = {
  email: string;
  token: string;
};

export interface AuthContentProps {
  user: UserProps | null;
  login: (user: UserProps) => Promise<void>;
  logout: () => void;
}
