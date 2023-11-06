import axios from "axios";
import { User } from "../src/utils/types";

const baseUrl = "http://localhost:3001/users";

const allUsers = async () => {
  const res = await axios.get(`${baseUrl}`);
  return res.data;
};

const createUser = async (newUser: User) => {
  const res = await axios.post(`${baseUrl}`, newUser);
  return res.data;
};

const userAPI = {
  allUsers,
  createUser,
};

export default userAPI;
