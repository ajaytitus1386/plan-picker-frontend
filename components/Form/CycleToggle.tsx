import React, { FC } from "react";

interface Props {
  isMonthly: boolean;
  setIsMonthly: React.Dispatch<React.SetStateAction<boolean>>;
}

const CycleToggle: FC<Props> = ({ isMonthly, setIsMonthly }) => {
  return (
    <div className="relative w-40 h-12 mt-5 overflow-hidden rounded-full bg-lucidean hover:brightness-125 transition-all">
      <input
        type="checkbox"
        className="relative w-full h-full p-0 m-0 opacity-0 cursor-pointer z-[3]"
        onClick={() => setIsMonthly(!isMonthly)}
      />
      {/* Knobs */}
      <div
        className={[
          "z-[2] absolute top-1 w-20 h-8 text-center text-lucidean text-sm font-bold m-1 px-1 py-2 rounded-xl transition-all ",
          isMonthly ? "left-2 bg-white" : "left-16 bg-white",
        ].join(" ")}
      >
        <span>{isMonthly ? "Monthly" : "Yearly"}</span>
      </div>
    </div>
  );
};

export default CycleToggle;
