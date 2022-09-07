import axios from "axios";
import { ROUTES } from "../../utils/api";

export async function addStripeSub(
  payment_method: string,
  email: string,
  priceId: string
) {
  try {
    const res = await axios({
      url: ROUTES.STRIPE.CREATE,
      method: "POST",
      data: {
        payment_method,
        email,
        priceId,
      },
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
