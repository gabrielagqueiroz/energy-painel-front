import { ReactNode } from "react";
import { AuthProvider } from "./auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AuthProviderProps) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
};
