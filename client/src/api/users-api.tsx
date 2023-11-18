import axios from "axios";
import { ChangePw, RegisterInfo } from "../utils/types";

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

const changePwLink = async (email: string) => {
  const res = await axios.post(`${baseUrl}/${email}`);
  return res.data;
};

// users/forgot/:code

const getCode = async (code: string) => {
  const res = await axios.get(`${baseUrl}/forgot/${code}`);
  return res.data;
};

const newPw = async (code: string, passwords: ChangePw) => {
  const res = await axios.put(`${baseUrl}/forgot/${code}`, passwords);
  return res.data;
};

const userAPI = {
  allUsers,
  createUser,
  itsMe,
  changePwLink,
  getCode,
  newPw,
};

export default userAPI;
