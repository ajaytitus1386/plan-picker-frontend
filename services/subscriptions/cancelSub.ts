import axios from "axios";
import { ROUTES } from "../../utils/api";

export async function cancelSub(subId: string) {
  try {
    const res = await axios({
      url: ROUTES.SUBSCRIPTION.CANCEL(subId),
      method: "PATCH",
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
