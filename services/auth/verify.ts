import axios from "axios";
import { User, userFromJSON } from "../../interfaces/user";
import { ROUTES } from "../../utils/api";

export async function verifyJWT(token: string): Promise<User | null> {
  try {
    const res = await axios({
      url: ROUTES.AUTH.VERIFY,
      method: "GET",
      headers: {
        token,
      },
    });
    return userFromJSON(res.data);
  } catch (error) {
    return null;
  }
}
