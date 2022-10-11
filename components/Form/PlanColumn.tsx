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

  const cellOpacity = isSelected ? "opacity-100" : "opacity-50";

  return (
    <div
      className={[
        "flex flex-col  col-span-1",
        isSelected ? "text-lucidean font-semibold" : "text-black",
      ].join(" ")}
    >
      <div
        className={[
          "relative w-20 h-20 font-semibold flex items-center self-center justify-center bg-lucidean text-white rounded-lg bottomArrow",
          cellOpacity,
        ].join(" ")}
      >
        {plan.planName}
      </div>

      <Cell className={cellOpacity}>
        {" "}
        &#8377;{" "}
        {isMonthly ? plan.monthlyPrice.toString() : plan.yearlyPrice.toString()}
      </Cell>
      <Cell className={cellOpacity}>{plan.videoQuality.toString()}</Cell>
      <Cell className={cellOpacity}>{plan.resolution}</Cell>
      <div className="flex flex-col">
        {devices.map((device) => (
          <Cell className={cellOpacity} key={device + plan.id} disableBorder>
            {device}
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default PlanColumn;
