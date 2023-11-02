import { ChangeEvent, FormEvent, useState } from "react";
import { ExpenseType } from "../utils/types";

type ExpensesModalProps = {
  handleCloseExpenses: (newBalance: number, expenseType: ExpenseType) => void;
  setExpenses: (value: number) => void;
};

const ExpensesModal = ({
  handleCloseExpenses,
  setExpenses,
}: ExpensesModalProps) => {
  const [expenseValue, setExpenseValue] = useState("");
  const [selectedButton, setSelectedButton] = useState<ExpenseType | null>(
    null
  );

  // Handles the new expense

  const handleExpenses = (event: FormEvent) => {
    event.preventDefault();

    if (!selectedButton) {
      return console.log("select a type");
    }

    // Checks that new expense is a number
    const expense = parseFloat(expenseValue);
    if (!isNaN(expense)) {
      setExpenses(expense);
    }

    // Closes the modal with the new added expense
    handleCloseExpenses(expense, selectedButton);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpenseValue(event.target.value);
  };

  return (
    <div className="modal">
      <div className="inner-modal">
        <form id="expenses-form" onSubmit={handleExpenses}>
          <h1>Add expense</h1>
          <input
            className="money-input"
            type="text"
            id="expense-input"
            onChange={handleInputChange}
          />
          <div className="money-input-type">
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Rent
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Rent);
              }}
            >
              Rent
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Bills
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Bills);
              }}
            >
              Bills
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Shopping
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Shopping);
              }}
            >
              Shopping
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Savings
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Savings);
              }}
            >
              Savings
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Restaurant
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Restaurant);
              }}
            >
              Restaurant
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Pets
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Pets);
              }}
            >
              Pets
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Transport
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Transport);
              }}
            >
              Transport
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Food
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Food);
              }}
            >
              Food
            </button>
            <button
              type="button"
              style={{
                backgroundColor:
                  selectedButton === ExpenseType.Other
                    ? "var(--primarylight)"
                    : "var(--secondary)",
              }}
              onClick={() => {
                setSelectedButton(ExpenseType.Other);
              }}
            >
              Other
            </button>
          </div>
          <div className="money-input-buttons">
            <button type="submit">Add</button>
            <button
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

export default ExpensesModal;
