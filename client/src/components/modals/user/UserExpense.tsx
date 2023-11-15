import {
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { ExpenseType, UserData, ExpenseValues } from "../../../utils/types";
import expenseAPI from "../../../api/expense-api";
import { isAxiosError } from "axios";
import { verifyUser } from "../../../utils/middleware";

type ExpenseModalProps = {
  handleCloseExpenses: (newBalance: number, expenseType: ExpenseType) => void;
  setExpenses: (value: number) => void;
  userData: UserData | null;
  setExpensesArray: Dispatch<SetStateAction<ExpenseValues[]>>;
  expensesArray: ExpenseValues[];
  setExpenseValues: Dispatch<SetStateAction<ExpenseValues>>;
  expenses: number;
};

const UserExpense = ({
  handleCloseExpenses,
  setExpenses,
  userData,
  setExpensesArray,
  expensesArray,
  setExpenseValues,
  expenses,
}: ExpenseModalProps) => {
  const [expenseValue, setExpenseValue] = useState("");
  const [selectedButton, setSelectedButton] = useState<ExpenseType | null>(
    null
  );
  const nullValues = {
    Rent: 0,
    Bills: 0,
    Shopping: 0,
    Savings: 0,
    Restaurant: 0,
    Pets: 0,
    Transport: 0,
    Food: 0,
    Other: 0,
  };

  // Handles the new expense

  const handleExpenses = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedButton) {
      return console.log("select a type");
    }
    try {
      // Checks that new expense is a number
      const expense = parseFloat(expenseValue);
      if (!isNaN(expense)) {
        // New expense object

        if (userData) {
          const newExpense = {
            value: expense,
            type: selectedButton,
            userId: userData.id,
          };

          // Verify the token from localStorage

          const verify = await verifyUser();
          if (verify && verify.user && verify.auth === true) {
            expenseAPI.setToken(verify.user.token);
            const expenseRes = await expenseAPI.addExpense(newExpense);

            const expenseValue = expenseRes.savedExpense.value;
            const expenseType = expenseRes.savedExpense.type;

            console.log("expensesRes", expenseRes);

            const updatedArray = expensesArray.concat(expenseRes.savedExpense);

            const updatedExpense = expensesArray.reduce(
              (acc: ExpenseValues, expense: ExpenseValues) => {
                acc[expense.type] += expense.value;
                return acc;
              },
              { ...nullValues }
            );

            setExpenseValues(updatedExpense);
            setExpensesArray(updatedArray);
            setExpenses(expenses + expenseValue);

            console.log("expensevalue & type", expenseValue, expenseType);
            console.log("expence array", expensesArray);

            // Closes the modal with the new added expense and expense by type
            handleCloseExpenses(expenseValue, expenseType);
          } else {
            window.location.replace("/fake");
          }
        }
      }
    } catch (error: unknown) {
      console.log("error on expense", error);
      if (isAxiosError(error)) {
        console.log("axios expense error", error);
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpenseValue(event.target.value);
  };

  // RETURN

  return (
    <div className="modal">
      <div className="inner-modal">
        <form id="expenses-form" onSubmit={handleExpenses}>
          <h1 style={{ margin: "4px", color: "var(--secondary)" }}>
            Add expense
          </h1>
          <input
            className="money-input"
            type="text"
            id="expense-input"
            onChange={handleInputChange}
          />
          <div className="money-input-type">
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Rent ? "var(--secondary)" : "",
                color: selectedButton === ExpenseType.Rent ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Rent);
              }}
            >
              Rent
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Bills
                    ? "var(--secondary)"
                    : "",
                color: selectedButton === ExpenseType.Bills ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Bills);
              }}
            >
              Bills
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Shopping
                    ? "var(--secondary)"
                    : "",
                color:
                  selectedButton === ExpenseType.Shopping ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Shopping);
              }}
            >
              Shopping
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Savings
                    ? "var(--secondary)"
                    : "",
                color:
                  selectedButton === ExpenseType.Savings ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Savings);
              }}
            >
              Savings
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Restaurant
                    ? "var(--secondary)"
                    : "",
                color:
                  selectedButton === ExpenseType.Restaurant ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Restaurant);
              }}
            >
              Restaurant
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Pets ? "var(--secondary)" : "",
                color: selectedButton === ExpenseType.Pets ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Pets);
              }}
            >
              Pets
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Transport
                    ? "var(--secondary)"
                    : "",
                color:
                  selectedButton === ExpenseType.Transport ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Transport);
              }}
            >
              Transport
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Food ? "var(--secondary" : "",
                color: selectedButton === ExpenseType.Food ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Food);
              }}
            >
              Food
            </button>
            <button
              className="modal-expense-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Other
                    ? "var(--secondary)"
                    : "",
                color: selectedButton === ExpenseType.Other ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Other);
              }}
            >
              Other
            </button>
          </div>
          <div className="money-input-buttons">
            <button
              type="submit"
              className="my-btn filled-btn money-input-button-expenses"
            >
              Add
            </button>
            <button
              className="my-btn outline-btn"
              onClick={() => handleCloseExpenses(0, ExpenseType.Bills)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserExpense;
