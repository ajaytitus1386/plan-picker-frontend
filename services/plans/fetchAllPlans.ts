import axios from "axios";
import { Plan } from "../../interfaces/plan";
import { ROUTES } from "../../utils/api";

export async function fetchAllPlans(): Promise<any[] | null> {
  try {
    const res = await axios({
      url: ROUTES.PLAN.GET_ALL,
      method: "GET",
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
