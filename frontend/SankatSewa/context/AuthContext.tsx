import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "../api/axios";

interface User {
  id: number;
  username: string;
}

interface AuthType {
  user: User | null;
  accessToken: string | null;
}

interface AuthContextType {
  auth: AuthType;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<AuthType>({
    user: null,
    accessToken: null,
  });

  // 🔁 Restore token on app start
  useEffect(() => {
    const loadToken = async () => {
      const refresh = await SecureStore.getItemAsync("refreshToken");
      if (refresh) {
        const response = await axios.post("/api/auth/token/refresh/", {
          refresh,
        });
        setAuth({
          user: response.data.user,
          accessToken: response.data.access,
        });
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await axios.post("/api/auth/login/", {
      username,
      password,
    });

    const { access, refresh, user } = response.data;

    await SecureStore.setItemAsync("refreshToken", refresh);

    setAuth({
      user,
      accessToken: access,
    });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("refreshToken");
    setAuth({ user: null, accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Must be inside AuthProvider");
  return context;
};