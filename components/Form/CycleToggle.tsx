import React, { FC, useState } from "react";

interface Props {
  isMonthly: boolean;
  setIsMonthly: React.Dispatch<React.SetStateAction<boolean>>;
}

const CycleToggle: FC<Props> = ({ isMonthly, setIsMonthly }) => {
  return (
    <button
      onClick={() => {
        setIsMonthly(!isMonthly);
      }}
      className="relative rounded-full bg-lucidean p-4 w-fit gap-x-4 flex justify-between transition-all duration-200"
    >
      {/* <div className="absolute right-4 top-2.5 bg-white w-11 h-8 rounded-full"></div> */}
      <div
        className={[
          "p-1 rounded-full ",
          isMonthly ? "text-lucidean bg-white" : "text-white",
        ].join(" ")}
      >
        Monthly
      </div>
      <div
        className={[
          "p-1 rounded-full ",
          !isMonthly ? "text-lucidean bg-white" : "text-white",
        ].join(" ")}
      >
        Yearly
      </div>
    </button>
  );
};

export default CycleToggle;
