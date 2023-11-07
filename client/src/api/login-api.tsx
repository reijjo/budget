import axios from "axios";
import { LoginCredentials } from "../utils/types";

const baseUrl = "http://localhost:3001/login";

// login

const login = async (user: LoginCredentials) => {
  const res = await axios.post(`${baseUrl}`, user);
  return res.data;
};

// login/user

const validateToken = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.get(`${baseUrl}`, config);
  console.log("res", res);
  return res.data;
};

const loginAPI = {
  validateToken,
  login,
};

export default loginAPI;
