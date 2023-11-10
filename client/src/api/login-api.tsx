import axios, { isAxiosError } from "axios";
import { LoginCredentials } from "../utils/types";

const baseUrl = "http://localhost:3001/login";

// let token = null;

// const setToken = (newToken) => {
//   token = `Bearer ${newToken}`;
// };

// login

const login = async (user: LoginCredentials) => {
  const res = await axios.post(`${baseUrl}`, user);
  return res.data;
};

// login/user

const validateToken = async (token: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const res = await axios.get(`${baseUrl}`, config);

    return res;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.log(error.response?.data.message);
    } else {
      console.log("ValidateToekn error", error);
    }
  }
};

const loginAPI = {
  // setToken,
  validateToken,
  login,
};

export default loginAPI;
