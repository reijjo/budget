import axios from "axios";
import { RegisterInfo } from "../utils/types";

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

// users/:email

const itsMe = async (email: string) => {
  console.log("AXIOS", email);
  const res = await axios.get(`${baseUrl}/${email}`);
  return res.data;
};

const userAPI = {
  allUsers,
  createUser,
  itsMe,
};

export default userAPI;
