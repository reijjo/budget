import axios from "axios";
import { Logged, RegisterInfo } from "../utils/types";

const baseUrl = "http://localhost:3001/users";

// users

const allUsers = async () => {
  const res = await axios.get(`${baseUrl}`);
  return res.data;
};

const createUser = async (newUser: RegisterInfo) => {
  const res = await axios.post(`${baseUrl}`, newUser);
  return res.data;
};

// users/:id

const findUser = async (id: Logged) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const userAPI = {
  allUsers,
  createUser,
  findUser,
};

export default userAPI;
