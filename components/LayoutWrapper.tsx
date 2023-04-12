import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { AuthContextType, useAuthContext } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper: FC<Props> = ({ children }) => {
  const { user, logout, token, subscription } =
    useAuthContext() as AuthContextType;
  const { push } = useRouter();
  const [hasUser, setHasUser] = useState(false);
  useEffect(() => {
    if (user) setHasUser(true);
    else setHasUser(false);
  }, [user]);

  return (
    <div className="w-full h-full bg-gradient-to-r from-lucidean to-cordovan animate-gradient-animate bg-animated">
      <div className="w-full h-20 py-4 px-8 bg-opacity-30 bg-white backdrop-blur-lg flex flex-row justify-between items-center">
        <h1 className="text-white text-xl font-bold">Streaming Plans</h1>
        <button
          onClick={() => {
            if (hasUser) logout();
            else push("/login");
          }}
          className="p-2 border text-white rounded-md border-white border-opacity-50"
        >
          {hasUser ? "Logout" : "Log In"}
        </button>
      </div>
      {children}
    </div>
  );
};

export default LayoutWrapper;
