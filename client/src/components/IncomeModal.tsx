import { ChangeEvent, FormEvent, useState } from "react";
import { IncomeType } from "../utils/types";

type IncomeModalProps = {
  handleCloseIncome: (newBalance: number, incomeType: IncomeType) => void;
  setIncome: (value: number) => void;
};

const IncomeModal = ({ handleCloseIncome, setIncome }: IncomeModalProps) => {
  const [incomeValue, setIncomeValue] = useState("");
  const [selectedButton, setSelectedButton] = useState<IncomeType | null>(null);

  // Handles the new income

  const handleIncome = (event: FormEvent) => {
    event.preventDefault();

    if (!selectedButton) {
      return console.log("select a type");
    }

    // Checks that new income is a number
    const income = parseFloat(incomeValue);
    if (!isNaN(income)) {
      setIncome(income);
    }

    // Closes the modal with the new added income and income by type
    handleCloseIncome(income, selectedButton);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIncomeValue(event.target.value);
  };

  console.log("selectedButton", selectedButton);
  // RETURN

  return (
    <div className="modal">
      <div className="inner-modal">
        <form id="income-form" onSubmit={handleIncome}>
          <h1 style={{ margin: "4px", color: "var(--primarylight)" }}>
            Add income
          </h1>
          <input
            className="money-input"
            type="text"
            id="income-input"
            onChange={handleInputChange}
          />
          <div className="money-input-type">
            {/* <h2>Select type</h2> */}
            <button
              className="modal-income-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === IncomeType.Salary
                    ? "var(--primarylight)"
                    : "",
                color: selectedButton === IncomeType.Salary ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(IncomeType.Salary);
              }}
            >
              Salary
            </button>
            <button
              className="modal-income-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === IncomeType.Kela
                    ? "var(--primarylight)"
                    : "",
                color: selectedButton === IncomeType.Kela ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(IncomeType.Kela);
              }}
            >
              Kela
            </button>

            <button
              className="modal-income-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === IncomeType.Savings
                    ? "var(--primarylight)"
                    : "",
                color: selectedButton === IncomeType.Savings ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(IncomeType.Savings);
              }}
            >
              Savings
            </button>

            <button
              className="modal-income-button"
              type="button"
              style={{
                backgroundColor:
                  selectedButton === IncomeType.Other
                    ? "var(--primarylight)"
                    : "",
                color: selectedButton === IncomeType.Other ? "var(--bg)" : "",
              }}
              onClick={() => {
                setSelectedButton(IncomeType.Other);
              }}
            >
              Other
            </button>
          </div>
          <div className="money-input-buttons">
            <button type="submit" className="money-input-button-income">
              Add
            </button>
            <button
              className="money-input-button-cancel"
              onClick={() => handleCloseIncome(0, IncomeType.Salary)}
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

export default IncomeModal;
