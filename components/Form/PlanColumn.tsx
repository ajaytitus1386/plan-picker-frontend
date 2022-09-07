import React, { FC } from "react";
import { Plan } from "../../interfaces/plan";
import Cell from "./Cell";

interface Props {
  plan: Plan;
  isSelected: boolean;
  isMonthly: boolean;
}

const PlanColumn: FC<Props> = ({ plan, isSelected, isMonthly }) => {
  const devices = plan.devices.split("+");

  return (
    <div
      className={[
        "flex flex-col  col-span-1",
        isSelected ? "text-lucidean font-semibold" : "opacity-50 text-black",
      ].join(" ")}
    >
      <div className="w-20 h-20 font-semibold flex items-center self-center justify-center bg-lucidean text-white">
        {plan.planName}
      </div>

      <Cell>
        {" "}
        &#8377;{" "}
        {isMonthly ? plan.monthlyPrice.toString() : plan.yearlyPrice.toString()}
      </Cell>
      <Cell>{plan.videoQuality.toString()}</Cell>
      <Cell>{plan.resolution}</Cell>
      <div className="flex flex-col">
        {devices.map((device) => (
          <Cell key={device + plan.id} disableBorder>
            {device}
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default PlanColumn;
