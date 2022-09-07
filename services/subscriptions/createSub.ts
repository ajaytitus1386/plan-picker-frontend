import axios from "axios";
import { ROUTES } from "../../utils/api";

export async function createSub(
  userId: string,
  planId: string,
  billingCycle: string,
  startDate: Date,
  endDate: Date,
  isActive: boolean,
  stripeSubId: string
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
        stripeSubId,
      },
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
