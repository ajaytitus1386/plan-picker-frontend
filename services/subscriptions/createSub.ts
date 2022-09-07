import axios from "axios";
import { ROUTES } from "../../utils/api";

export async function createSub(
  userId: string,
  planId: string,
  billingCycle: string,
  startDate: Date,
  endDate: Date,
  isActive: boolean
) {
  try {
    const res = await axios({
      url: ROUTES.SUBSCRIPTION.CREATE,
      method: "POST",
      data: {
        userId,
        planId,
        billingCycle,
        startDate,
        endDate,
        isActive,
        // Deprecated
        creditCardNumber: "4242-4242-4242-4242",
        creditCardExpiry: "2/24",
        creditCardCvv: "420",
      },
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
