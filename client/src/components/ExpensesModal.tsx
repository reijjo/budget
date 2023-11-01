import { ChangeEvent, FormEvent, useState } from "react";

type ExpensesModalProps = {
  handleCloseExpenses: (newBalance: number) => void;
  setExpenses: (value: number) => void;
};

const ExpensesModal = ({
  handleCloseExpenses,
  setExpenses,
}: ExpensesModalProps) => {
  const [expenseValue, setExpenseValue] = useState("");

  // Handles the new income

  const handleExpenses = (event: FormEvent) => {
    event.preventDefault();

    // Checks that new income is a number
    const expense = parseFloat(expenseValue);
    if (!isNaN(expense)) {
      setExpenses(expense);
    }

    // Closes the modal with the new added income
    handleCloseExpenses(expense);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpenseValue(event.target.value);
  };
  return (
    <div className="modal">
      <div className="inner-modal">
        <form onSubmit={handleExpenses}>
          <h1>Add income</h1>
          <input
            className="money-input"
            type="text"
            onChange={handleInputChange}
          />
          <div className="money-input-buttons">
            <button type="submit">Add</button>
            <button onClick={() => handleCloseExpenses(0)} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpensesModal;
