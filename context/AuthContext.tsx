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
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<string | null>;
  signUp: (
    username: string,
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<string | null>;
  logout: () => void;
  setSub: React.Dispatch<React.SetStateAction<Subscription | null>>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function verifyInitialToken() {
      const token = localStorage.getItem("token");
      if (token === undefined || token === null) return;
      setToken(token);
    }
    async function fetchUserByToken() {
      if (!token) return;
      const user = await verifyJWT(token);
      if (user === null) return;
      setUser(user);
      console.log("Verified user from token: " + user.id);
    }

    verifyInitialToken();
    fetchUserByToken();
  }, [token]);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const data = await loginUser(email, password);
    if (data.token !== undefined || data.token !== null) {
      if (rememberMe) localStorage.setItem("token", data.token);
      setToken(data.token);
      return data.token;
    }
    return null;
  };

  const signUp = async (
    username: string,
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const data = await signUpUser(email, username, password);
    if (data.token !== undefined || data.token !== null) {
      if (rememberMe) localStorage.setItem("token", data.token);
      setToken(data.token);
      return data.token;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        subscription: subscription,
        user: user,
        token: token,
        login,
        signUp,
        logout,
        setSub: setSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => React.useContext(AuthContext);
