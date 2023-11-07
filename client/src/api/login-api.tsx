import axios from "axios";
import { LoginCredentials } from "../utils/types";

const baseUrl = "http://localhost:3001/login";

const login = async (user: LoginCredentials) => {
  const res = await axios.post(`${baseUrl}`, user);
  return res.data;
};

const loginAPI = {
  login,
};

export default loginAPI;
