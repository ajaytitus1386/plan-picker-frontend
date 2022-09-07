import React, { FC } from "react";
import { Plan } from "../../interfaces/plan";
import Moment from "react-moment";
import { Subscription } from "../../interfaces/subscription";
import ActiveTag from "./ActiveTag";

interface Props {
  subscription: Subscription;
  plan: Plan;
}

const PlanCard: FC<Props> = ({ subscription, plan }) => {
  return (
    <div className="rounded-xl bg-white p-4 flex flex-col gap-y-4 w-1/3 h-fit justify-center items-start">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-x-1">
          <h1 className="text-black text-2xl font-semibold">
            Current Plan Details
          </h1>
          {subscription.isActive ? (
            <ActiveTag label="Active" className="bg-blue-100 text-lucidean" />
          ) : (
            <ActiveTag label="Cancelled" className="bg-red-50 text-red-400" />
          )}
        </div>
        {subscription.isActive ? (
          <button className="text-lucidean font-semibold">Cancel</button>
        ) : null}
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg text-gray-700 font-semibold">{plan.planName}</h2>
        <h3 className="text-base text-gray-500">{plan.devices}</h3>
      </div>

      <div>
        <b className="text-3xl text-black font-bold">
          &#8377;{" "}
          {subscription.billingCycle === "yearly"
            ? plan.yearlyPrice.toString()
            : plan.monthlyPrice.toString()}
        </b>
        <text className="text-black text-lg font-semibold">
          {subscription.billingCycle === "yearly" ? "/yr" : "/mt"}
        </text>
      </div>
      <button className="text-lucidean font-medium px-4 py-2 border-lucidean border bg-white rounded">
        {subscription.isActive ? "Change" : "Choose"}
        {" Plan"}
      </button>
      <div className="w-full bg-gray-100 rounded-lg p-2 text-black font-normal">
        {subscription.isActive ? (
          <p>
            Your subscription has started on{" "}
            <Moment
              date={subscription.startDate}
              format="MMM Do, YYYY"
              className="font-semibold"
            ></Moment>{" "}
            and will auto renew on{" "}
            <Moment
              date={subscription.endDate}
              format="MMM Do, YYYY"
              className="font-semibold"
              add={{ days: 1 }}
            ></Moment>
          </p>
        ) : (
          <p>
            Your subscription was cancelled and you will lose access to services
            on{" "}
            <Moment
              date={subscription.endDate}
              format="MMM Do, YYYY"
              className="font-semibold"
            ></Moment>
          </p>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
