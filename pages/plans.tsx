import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Cell from "../components/Form/Cell";
import CycleToggle from "../components/Form/CycleToggle";
import PaymentCard from "../components/Form/PaymentCard";
import PlanColumn from "../components/Form/PlanColumn";
import SubmitButton from "../components/SubmitButton";
import { AuthContextType, useAuthContext } from "../context/AuthContext";
import { Plan, planFromJSON } from "../interfaces/plan";
import { fetchAllPlans } from "../services/plans/fetchAllPlans";

const PlansPage: NextPage = () => {
  const { user } = useAuthContext() as AuthContextType;
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isMonthly, setIsMonthly] = useState(true);

  const [step, setStep] = useState(1);

  useEffect(() => {
    async function getPlansDetails() {
      const fetchedPlans = await fetchAllPlans();
      if (!fetchedPlans || fetchedPlans.length == 0) return;
      setPlans(fetchedPlans.map((plan) => planFromJSON(plan)));
    }
    getPlansDetails();
  }, []);

  useEffect(() => {
    if (plans.length !== 0) setSelectedPlan(plans[0].id.toString());
  }, [plans]);

  return (
    <div className="flex items-center justify-center">
      {/* Step 1 - Choose A Plan */}
      {step === 1 && (
        <div className="w-1/2 p-4 m-4 flex flex-col rounded-lg bg-white">
          {plans.length !== 0 && (
            <div className="grid grid-flow-col">
              <div className="col-span-2 flex flex-col text-black">
                <div className="h-20 flex items-center">
                  <CycleToggle
                    isMonthly={isMonthly}
                    setIsMonthly={setIsMonthly}
                  />
                </div>

                <Cell className="justify-start">
                  {isMonthly ? "Monthly" : "Yearly"} Price
                </Cell>
                <Cell className="justify-start">Video Quality</Cell>
                <Cell className="justify-start">Resoultion</Cell>
                <Cell className="justify-start" disableBorder>
                  Devices you can use to watch
                </Cell>
              </div>

              {plans.map((plan) => (
                <div
                  key={plan.id.toString()}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedPlan(plan.id.toString());
                  }}
                >
                  <PlanColumn
                    plan={plan}
                    isSelected={plan.id.toString() === selectedPlan}
                    isMonthly={isMonthly}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="w-1/2 self-center">
            <SubmitButton
              label="Next"
              onClick={() => {
                setStep(2);
              }}
            />
          </div>
        </div>
      )}
      {/* Step 2 - Add Credit Card Info */}
      {step === 2 && user && (
        <PaymentCard
          plan={plans.find((plan) => plan.id === selectedPlan) as Plan}
          user={user}
          billingCycle={isMonthly ? "Monthly" : "Yearly"}
        />
      )}
    </div>
  );
};

export default PlansPage;
