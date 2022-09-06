import axios from "axios";
import { ROUTES } from "../../utils/api";

export async function loginUser(email: string, password: string) {
  try {
    const res = await axios({
      url: ROUTES.AUTH.LOGIN,
      method: "POST",
      data: {
        email,
        password,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
}
