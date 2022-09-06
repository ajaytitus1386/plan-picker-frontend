import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Subscription } from "../interfaces/subscription";
import { User } from "../interfaces/user";
import { loginUser } from "../services/auth/login";
import { signUpUser } from "../services/auth/signup";
import { verifyJWT } from "../services/auth/verify";

export type AuthContextType = {
  token: string | null;
  user: User | null;
  subscription: Subscription | null;
  login: (email: string, password: string) => Promise<string | null>;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<string | null>;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function verifyInitialToken() {
      const token = localStorage.getItem("token");
      if (token === undefined || token === null) return;
      setToken(token);
      const user = await verifyJWT(token);
      if (user === null) return;
      setUser(user);
      console.log("Verified user from token: " + user.id);
    }

    verifyInitialToken();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data.token !== undefined || data.token !== null) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      return data.token;
    }
    return null;
  };

  const signUp = async (username: string, email: string, password: string) => {
    const data = await signUpUser(email, username, password);
    if (data.token !== undefined || data.token !== null) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      return data.token;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        subscription: null,
        user: user,
        token: token,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);
