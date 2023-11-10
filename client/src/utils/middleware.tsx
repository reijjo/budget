import { Logged } from "./types";
import loginAPI from "../api/login-api";
import { isAxiosError } from "axios";

export const verifyUser = async () => {
  try {
    const logged = window.localStorage.getItem("budgetUser");
    if (logged) {
      const parsed = JSON.parse(logged) as Logged;

      const validate = await loginAPI.validateToken(parsed.token);
      console.log("forgot token", validate);

      if (validate && validate.status === 200) {
        console.log("WOHO");
        return true;
      } else {
        console.log("forgot token", validate);
        return false;
      }
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.log(error.response?.data.message);
    } else {
      console.log("ValidateToekn error", error);
    }
  }
};
