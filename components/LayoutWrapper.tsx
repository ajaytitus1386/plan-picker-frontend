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
    <div className="w-full h-full">
      <div className="w-full h-20 p-4 bg-white flex flex-row justify-end items-center">
        {
          <button
            onClick={() => {
              if (hasUser) logout();
              else push("/login");
            }}
            className="p-2 border text-black rounded-md border-gray-500 border-opacity-50"
          >
            {hasUser ? "Logout" : "Log In"}
          </button>
        }
      </div>
      {children}
    </div>
  );
};

export default LayoutWrapper;
