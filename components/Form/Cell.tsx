import { FC } from "react";

const Cell: FC<{
  children: React.ReactNode;
  className?: string;
  disableBorder?: boolean;
}> = ({ children, className, disableBorder = false }) => {
  return (
    <div
      className={!disableBorder ? "border-b border-gray-400 !opacity-100" : ""}
    >
      <div
        className={["py-4 flex items-center justify-center ", className].join(
          " "
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Cell;
