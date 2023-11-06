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

export type IncomeValues = {
  Salary: number;
  Kela: number;
  Savings: number;
  Other: number;
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

export type User = {
  email: string;
  passwd: string;
  passwd2: string;
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
