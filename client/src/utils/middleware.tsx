import { Logged } from "./types";
import loginAPI from "../api/login-api";
import { isAxiosError } from "axios";

export const verifyUser = async () => {
  try {
    const logged = window.localStorage.getItem("budgetUser");
    if (logged) {
      const parsed = JSON.parse(logged) as Logged;

      const validate = await loginAPI.validateToken(parsed.token);

      if (validate && validate.status === 200) {
        return { user: parsed, auth: true };
      } else {
        console.log("forgot token", validate);
        return { auth: false };
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

export const parseDate = (date: string) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const year = dateObj.getUTCFullYear();

  const hours = String(dateObj.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

  return {
    time: `${hours}:${minutes}:${seconds}`,
    date: `${day}/${month}/${year} `,
  };
};
