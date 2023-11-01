import { ChangeEvent, FormEvent, useState } from "react";

type IncomeModalProps = {
  handleCloseIncome: (newBalance: number) => void;
  setIncome: (value: number) => void;
};

const IncomeModal = ({ handleCloseIncome, setIncome }: IncomeModalProps) => {
  const [incomeValue, setIncomeValue] = useState("");

  // Handles the new income

  const handleIncome = (event: FormEvent) => {
    event.preventDefault();

    // Checks that new income is a number
    const income = parseFloat(incomeValue);
    if (!isNaN(income)) {
      setIncome(income);
    }

    // Closes the modal with the new added income
    handleCloseIncome(income);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIncomeValue(event.target.value);
  };

  // RETURN

  return (
    <div className="modal">
      <div className="inner-modal">
        <form onSubmit={handleIncome}>
          <h1>Add income</h1>
          <input
            className="money-input"
            type="text"
            onChange={handleInputChange}
          />
          <div className="money-input-type">
            {/* <h2>Select type</h2> */}
            <button>Salary</button>
            <button>Kela</button>
            <button>Other</button>
            <button>extra</button>
          </div>
          <div className="money-input-buttons">
            <button type="submit">Add</button>
            <button onClick={() => handleCloseIncome(0)} type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeModal;
