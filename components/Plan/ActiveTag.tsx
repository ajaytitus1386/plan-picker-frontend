import React, { FC } from "react";

const ActiveTag: FC<{ label: string; className: string }> = ({
  label,
  className,
}) => {
  return (
    <div
      className={[
        "text-center rounded-md px-2 py-1 text-sm font-medium tracking-wider",
        className,
      ].join(" ")}
    >
      {label}
    </div>
  );
};

export default ActiveTag;
