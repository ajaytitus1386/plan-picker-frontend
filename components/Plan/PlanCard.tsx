import React, { FC, useState } from "react";
import { Plan } from "../../interfaces/plan";
import Moment from "react-moment";
import { Subscription } from "../../interfaces/subscription";
import ActiveTag from "./ActiveTag";
import { cancelStripeSub } from "../../services/subscriptions/cancelStripeSub";
import { cancelSub } from "../../services/subscriptions/cancelSub";
import { useRouter } from "next/router";
import CancelModal from "./CancelModal";
import GlassCard from "../GlassCard";

interface Props {
  subscription: Subscription;
  plan: Plan;
}

const PlanCard: FC<Props> = ({ subscription, plan }) => {
  const router = useRouter();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const openCancelModal = () => {
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };

  async function cancelSubGlobal() {
    if (!subscription.stripeSubId) return;
    const delSub = await cancelStripeSub(subscription.stripeSubId);
    if (!delSub) return;
    const data = await cancelSub(subscription.id);
    if (!data) return;
    router.reload();
  }

  return (
    <GlassCard className="p-4 flex flex-col gap-y-4 w-1/3 h-fit justify-center items-start">
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
          <>
            <button
              onClick={() => openCancelModal()}
              className="text-lucidean font-semibold bg-seasalt bg-opacity-0 hover:bg-opacity-70 transition-all duration-300 p-2 rounded-lg"
              data-modal-toggle="popup-modal"
              type="button"
            >
              Cancel
            </button>
            <CancelModal
              isVisible={cancelModalOpen}
              closeMethod={closeCancelModal}
              confirmAction={cancelSubGlobal}
            />
          </>
        ) : null}
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg text-black font-semibold">{plan.planName}</h2>
        <h3 className="text-base text-black">{plan.devices}</h3>
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
      <button
        onClick={() => {
          if (subscription.isActive) openCancelModal();
          router.push("plans");
        }}
        className="text-lucidean font-medium px-4 py-2 bg-seasalt bg-opacity-40 hover:bg-opacity-70 transition-all duration-300 rounded"
      >
        {subscription.isActive ? "Change" : "Choose"}

        {" Plan"}
      </button>
      <div className="w-full bg-seasalt bg-opacity-40 rounded-lg p-2 text-black font-normal">
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
    </GlassCard>
  );
};

export default PlanCard;
