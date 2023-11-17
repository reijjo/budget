import axios from "axios";
import { RegisterInfo } from "../utils/types";

const baseUrl = "http://localhost:3001/users";

// let token: string | null = null;

// const setToken = (newToken: string) => {
//   token = `${newToken}`;
// };

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
  const res = await axios.get(`${baseUrl}/${email}`);
  return res.data;
};

// users/forgot/:code

const getCode = async (code: string) => {
  console.log("AXIOS getCode", code);
  const res = await axios.get(`${baseUrl}/forgot/${code}`);
  return res.data;
};

const newPw = async (code: string) => {
  console.log("AXIOS put new pw", code);

  const res = await axios.put(`${baseUrl}/forgot/${code}`);
  return res.data;
};

const userAPI = {
  allUsers,
  createUser,
  itsMe,
  getCode,
  newPw,
};

export default userAPI;
