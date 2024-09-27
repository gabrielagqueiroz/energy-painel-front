import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthContentProps,
  AuthProviderProps,
  UserProps,
  UserStorage,
} from "./types";
import { userService } from "../../services/user/userService";

const AuthContext = createContext<AuthContentProps>({} as AuthContentProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserStorage | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = useCallback(async (user: UserProps) => {
    const { response } = await userService.login(user);

    const storageUser: UserStorage = {
      email: user.email,
      token: response,
    };

    setUser(storageUser);
    localStorage.setItem("user", JSON.stringify(storageUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("user");
    };
  }, []);

  const contextValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
