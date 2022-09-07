import React, { FC } from "react";
import { Plan } from "../../interfaces/plan";
import { User } from "../../interfaces/user";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js/types/stripe-js";
import { addStripeSub } from "../../services/subscriptions/addStripeSub";
import SubmitButton from "../SubmitButton";
import { toast } from "react-toastify";
import { stripePlans } from "../../utils/stripePlans";
import { createSub } from "../../services/subscriptions/createSub";
import moment from "moment";
import { useRouter } from "next/router";

interface Props {
  plan: Plan;
  user: User;
  billingCycle: string;
}

const PaymentCard: FC<Props> = ({ plan, user, billingCycle }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const priceId =
    stripePlans[plan.planName.toLowerCase()][billingCycle.toLowerCase()];

  const startDate = moment().toDate();
  const endDate = moment(startDate)
    .add(1, billingCycle.toLowerCase() === "monthly" ? "M" : "y")
    .toDate();

  const handleSubmitSub = async () => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as StripeCardElement,
      billing_details: {
        email: user.email ?? "no@email.com",
      },
    });
    if (!result.paymentMethod) return;
    const data = await addStripeSub(
      result.paymentMethod.id,
      user.email,
      priceId
    );

    const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          email: user.email,
        },
      },
    });

    if (paymentResult.error) {
      toast.error("Oops! Something went Wrong");
      return;
    }
    toast.success("Hooray! Subscription Active");

    const newSub = await createSub(
      user.id,
      plan.id.toString(),
      billingCycle.toLowerCase(),
      startDate,
      endDate,
      true,
      data.subscriptionId
    );

    router.push("/currentPlan");
  };

  return (
    <div className="w-1/2 flex flex-row m-4">
      <div className="flex flex-col items-start flex-[2] bg-white px-8 py-8 rounded-tl-lg rounded-bl-lg">
        <h1 className="text-black text-3xl font-semibold">Complete Payment</h1>
        <h2 className="text-gray-600 text-base">
          Enter your credit or debit card details below
        </h2>
        <CardElement className="text-black w-full my-4 border-gray-400 border rounded-lg p-4" />

        <div className="w-1/4">
          <SubmitButton
            label="Confirm Payment"
            onClick={() => handleSubmitSub()}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-y-4 items-start px-8 py-8 bg-gray-50 rounded-tr-lg rounded-br-lg">
        <h1 className="text-black text-2xl font-semibold">Order Summary</h1>
        <div className="flex justify-between items-center w-full text-black">
          <text>Plan Name</text>
          <b>{plan.planName}</b>
        </div>
        <hr className="w-full" />
        <div className="flex justify-between items-center w-full text-black">
          <text>Billing Cycle</text>
          <b>{billingCycle}</b>
        </div>
        <hr className="w-full" />
        <div className="flex justify-between items-center w-full text-black">
          <text>Plan Price</text>
          <b>
            &#8377;
            {billingCycle.toLowerCase() === "monthly"
              ? plan.monthlyPrice.toString()
              : plan.yearlyPrice.toString()}
          </b>
        </div>
        <hr className="w-full" />
      </div>
    </div>
  );
};

export default PaymentCard;
