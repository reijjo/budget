import { useEffect, useState } from "react";

import IncomeModal from "../components/IncomeModal";
import ExpensesModal from "../components/ExpensesModal";

const TryItOut = () => {
  const [saldo, setSaldo] = useState<number>(0); // Current balande
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expensesModalOpen, setExpensesModalOpen] = useState(false);

  // Change the current balance everytime the income or expenses change

  useEffect(() => {
    setSaldo(income - expenses);
  }, [income, expenses]);

  // Open the income / expenses modal

  const handleOpenIncome = () => {
    console.log("lisaa massii");
    // setIncome(income + 1);
    setIncomeModalOpen(true);
  };

  const handleOpenExpenses = () => {
    console.log("lisaa menoja");
    setExpensesModalOpen(true);
  };

  // Closes the income / expenses modal and sets the new balance

  const handleCloseIncome = (newBalance: number) => {
    setIncomeModalOpen(false);
    if (!isNaN(newBalance)) {
      setIncome(income + newBalance);
    }
  };

  const handleCloseExpenses = (newBalance: number) => {
    setExpensesModalOpen(false);
    if (!isNaN(newBalance)) {
      setExpenses(expenses + newBalance);
    }
  };

  return (
    <div id="try-it-out">
      {incomeModalOpen && (
        <IncomeModal
          handleCloseIncome={handleCloseIncome}
          setIncome={setIncome}
        />
      )}
      {expensesModalOpen && (
        <ExpensesModal
          handleCloseExpenses={handleCloseExpenses}
          setExpenses={setExpenses}
        />
      )}
      <div className="balance">
        <div className="saldo">
          <h2>Saldo {saldo} €</h2>
          <div className="income-expenses">
            <h3>
              +{income} € | -{expenses} €
            </h3>
          </div>
        </div>
        <div className="money-buttons">
          <button className="income-button" onClick={handleOpenIncome}>
            +
          </button>
          <button className="expenses-button" onClick={handleOpenExpenses}>
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default TryItOut;
