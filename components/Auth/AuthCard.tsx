import React, { FC } from "react";

const AuthCard: FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="bg-white rounded-lg w-1/4 h-fit flex flex-col justify-center items-center p-8 m-4">
      <h1 className="text-xl text-black font-semibold mb-8">{title}</h1>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AuthCard;
