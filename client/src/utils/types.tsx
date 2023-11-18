export enum IncomeType {
  Salary = "Salary",
  Kela = "Kela",
  Savings = "Savings",
  Other = "Other",
}

export enum ExpenseType {
  Rent = "Rent",
  Bills = "Bills",
  Shopping = "Shopping",
  Savings = "Savings",
  Restaurant = "Restaurant",
  Pets = "Pets",
  Transport = "Transport",
  Food = "Food",
  Other = "Other",
}

export type NewIncome = {
  value: number;
  type: IncomeType;
};

export type NewExpense = {
  value: number;
  type: ExpenseType;
};

export type IncomeValues = {
  Salary: number;
  Kela: number;
  Savings: number;
  Other: number;
  [key: string]: number;
};

export type ExpenseValues = {
  Rent: number;
  Bills: number;
  Shopping: number;
  Savings: number;
  Restaurant: number;
  Pets: number;
  Transport: number;
  Food: number;
  Other: number;
  [key: string]: number;
};

export type LoginCredentials = {
  email: string;
  passwd: string;
};

export type RegisterInfo = LoginCredentials & {
  passwd2: string;
};

export type ChangePw = {
  passwd: string;
  passwd2: string;
};

export type Logged = {
  token: string;
  email: string;
};

export type InfoMsg = {
  style?: string;
  message?: string | null;
};

export type InputFocus = {
  email: boolean;
  passwd: boolean;
  passwd2: boolean;
};

export type EmailFocus = Omit<InputFocus, "email">;

export type FormErrors = {
  email: {
    len: string | null;
    valid: string | null;
  };
  passwd: {
    len: string | null;
    special: string | null;
    capital: string | null;
    num: string | null;
  };
  passwd2: {
    match: string | null;
  };
};

export type EmailErrors = Omit<FormErrors, "email">;

export type ErrorsEmail = {
  email: {
    len: string | null;
    valid: string | null;
  };
};

export type UserData = {
  email: string;
  id: string;
  incomes: IncomeValues;
  expenses: ExpenseValues;
};

export enum WhatType {
  Income = "income",
  Expense = "expense",
}
