import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/index";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessTokenState] = useState<string | null>(() => {
    const savedToken = sessionStorage.getItem("accessToken");
    return savedToken ? savedToken : null;
  });

  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    const savedRefreshToken = sessionStorage.getItem("refreshToken");
    return savedRefreshToken ? savedRefreshToken : null;
  });

  const login = (user: User) => {
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    setAccessTokenState(accessToken);
    sessionStorage.setItem("accessToken", accessToken || "");
    setRefreshToken(refreshToken);
    sessionStorage.setItem("refreshToken", refreshToken || "");
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    setAccessTokenState(null);
    sessionStorage.removeItem("accessToken");
    setRefreshToken(null);
    sessionStorage.removeItem("refreshToken");
  };

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
    sessionStorage.setItem("accessToken", token || "");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};