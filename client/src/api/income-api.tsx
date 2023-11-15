import axios from "axios";
import { NewIncome } from "../utils/types";

const baseUrl = "http://localhost:3001/incomes";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `${newToken}`;
};

// income

const addIncome = async (newIncome: NewIncome) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(`${baseUrl}`, newIncome, config);
  return res.data;
};

// income/:email

const getUserIncomes = async (email: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/${email}`, config);
  return res.data;
};

// incomes/:id

const deleteIncome = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const incomeAPI = {
  setToken,
  addIncome,
  getUserIncomes,
  deleteIncome,
};

export default incomeAPI;
