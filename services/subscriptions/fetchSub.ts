import axios from "axios";
import { Subscription } from "../../interfaces/subscription";
import { ROUTES } from "../../utils/api";

export async function fetchSub(userId: string): Promise<Subscription[] | null> {
  try {
    const res = await axios({
      url: ROUTES.SUBSCRIPTION.GET_BY_ID,
      method: "GET",
      params: {
        userId,
      },
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
