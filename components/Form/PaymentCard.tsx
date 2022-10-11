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
    try {
      if (!stripe || !elements) {
        throw Error("Error setting up payment! Please Try again later");
      }

      const result = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          email: user.email ?? "no@email.com",
        },
      });
      if (!result.paymentMethod) throw Error("Uh oh, unknown payment method");
      const data = await addStripeSub(
        result.paymentMethod.id,
        user.email,
        priceId
      );

      if (!data.clientSecret)
        throw Error(data.error.response.data.error.message);

      const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
          billing_details: {
            email: user.email,
          },
        },
      });

      if (paymentResult.error) {
        throw Error(paymentResult.error.code);
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
      return;
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <div className="w-1/2 flex flex-row m-4">
      <div className="flex flex-col items-start flex-[2] bg-white px-8 py-8 rounded-tl-lg rounded-bl-lg">
        <h1 className="text-black text-3xl font-semibold">Complete Payment</h1>
        <div className="flex flex-row justify-center items-center">
          <h2 className="text-gray-600 text-base">
            Enter your credit or debit card details below
          </h2>

          <div className="rounded-full text-black mx-2 bg-gray-200 border-gray-600 border w-5 h-5 flex justify-center items-center has-tooltip">
            <span className="tooltip rounded shadow-lg p-1 bg-gray-100 border-gray-400 border text-sm text-black -mt-12">
              Check{" "}
              <a
                href="https://stripe.com/docs/testing"
                target="_blank"
                rel="noreferrer"
                className="text-lucidean font-medium"
              >
                Stripe
              </a>{" "}
              for safe testing values
              <br />
              Ex. 4242 4242 4242 4242
            </span>
            ?
          </div>
        </div>
        <CardElement className="text-black w-full my-4 border-gray-400 border rounded-lg p-4" />

        <div className="w-1/2">
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
