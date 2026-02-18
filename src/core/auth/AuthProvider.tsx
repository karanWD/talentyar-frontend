"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getToken, removeToken, setToken } from "@/core/auth/token";
import { queryKeys } from "@/core/react-query/keys";
import { getProfile, logout } from "@/features/auth/api";
import { User } from "@/features/auth/types";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logoutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [localToken, setLocalToken] = useState<string | null>(getToken());

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: getProfile,
    enabled: !!localToken,
    retry: false,
    select: (res) => res.data.user as User,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      removeToken();
      setLocalToken(null);
    }
  }, [error]);

  const loginFn = (token: string) => {
    setToken(token);
    setLocalToken(token);
  };

  const logoutFn = async () => {
    try {
      await logout();
    } finally {
      removeToken();
      setLocalToken(null);
      queryClient.clear();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        isAuthenticated: !!data,
        isLoading,
        login: loginFn,
        logoutUser: logoutFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
