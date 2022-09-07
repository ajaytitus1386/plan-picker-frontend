import axios from "axios";
import { Plan } from "../../interfaces/plan";
import { ROUTES } from "../../utils/api";

export async function fetchPlanById(planId: string): Promise<Plan | null> {
  try {
    const res = await axios({
      url: ROUTES.PLAN.GET_ONE(planId),
      method: "GET",
    });

    return res.data;
  } catch (error) {
    return null;
  }
}
