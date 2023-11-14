import axios from "axios";
import { NewExpense } from "../utils/types";

const baseUrl = "http://localhost:3001/expenses";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `${newToken}`;
};

// expenses

const addExpense = async (newExpense: NewExpense) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(`${baseUrl}`, newExpense, config);
  return res.data;
};

// expenses/:email

const getUserExpenses = async (email: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${baseUrl}/${email}`, config);
  return res.data;
};

// expense/s:id

const deleteExpense = async (id: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  console.log("AXIOS DELETE res", res);
  return res.data;
};

const expenseAPI = {
  setToken,
  addExpense,
  getUserExpenses,
  deleteExpense,
};

export default expenseAPI;
