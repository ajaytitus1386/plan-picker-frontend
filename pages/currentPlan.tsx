import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PlanCard from "../components/Plan/PlanCard";
import { AuthContextType, useAuthContext } from "../context/AuthContext";
import { Plan } from "../interfaces/plan";
import { fetchPlanById } from "../services/plans/fetchPlanById";
import { fetchSub } from "../services/subscriptions/fetchSub";

const CurrentPlanPage: NextPage = () => {
  const { subscription, setSub, user } = useAuthContext() as AuthContextType;
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchLatestSub() {
      if (!user) return;
      const subs = await fetchSub(user.id);
      if (!subs || subs.length == 0) return;
      const latestSub = subs[0];
      setSub(latestSub);
      const plan = await fetchPlanById(latestSub.planId.toString());
      if (!plan) return;
      setCurrentPlan(plan);
    }
    fetchLatestSub();
  }, [setSub, user]);

  return (
    <div className="flex justify-center items-center h-screen">
      {subscription && currentPlan ? (
        <PlanCard plan={currentPlan} subscription={subscription} />
      ) : (
        <div className="w-fit bg-white rounded-lg p-8 gap-y-4 flex flex-col items-center justify-center">
          <h1 className="text-black text-2xl font-bold text-center">
            Welcome to your account!
          </h1>
          <h2 className="text-black">
            Looks like you don&apos;t have any subscriptions yet.
          </h2>
          <button
            onClick={() => {
              router.push("/plans");
            }}
            className="text-lucidean font-medium px-4 py-2 border-lucidean border bg-white rounded"
          >
            {"Choose A Plan"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrentPlanPage;
