import axios from "axios";
import { ROUTES } from "../../utils/api";

export async function signUpUser(
  email: string,
  username: string,
  password: string
) {
  try {
    const res = await axios({
      url: ROUTES.AUTH.SIGNUP,
      method: "POST",
      data: {
        username,
        email,
        password,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
}
