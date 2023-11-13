import axios from "axios";
import { NewExpense } from "../utils/types";

const baseUrl = "http://localhost:3001/expenses";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `${newToken}`;
};

// income

const addExpense = async (newExpense: NewExpense) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(`${baseUrl}`, newExpense, config);
  return res.data;
};

// income/:email

const getUserExpenses = async (email: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/${email}`, config);
  return res.data;
};

const expenseAPI = {
  setToken,
  addExpense,
  getUserExpenses,
};

export default expenseAPI;
