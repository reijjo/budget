import { ChangeEvent, FormEvent, useState } from "react";
import { ExpenseType } from "../../utils/types";

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

export default ExpensesModal;
