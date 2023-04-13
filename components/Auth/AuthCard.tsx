import React, { FC } from "react";
import GlassCard from "../GlassCard";

const AuthCard: FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <GlassCard className="w-1/4 h-fit flex flex-col justify-center items-center p-8 m-4">
      <h1 className="text-xl text-seasalt font-semibold mb-8">{title}</h1>
      <div className="w-full">{children}</div>
    </GlassCard>
  );
};

export default AuthCard;
