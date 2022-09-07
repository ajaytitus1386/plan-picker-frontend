import axios from "axios";
import { ROUTES } from "../../utils/api";

export async function cancelStripeSub(subscriptionId: string) {
  try {
    const res = await axios({
      url: ROUTES.STRIPE.CANCEL,
      method: "POST",
      data: {
        subscriptionId,
      },
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
