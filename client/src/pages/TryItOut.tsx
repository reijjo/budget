import { useEffect, useState } from "react";

import {
  ExpenseType,
  ExpenseValues,
  IncomeType,
  IncomeValues,
} from "../utils/types";

import IncomeModal from "../components/IncomeModal";
import ExpensesModal from "../components/ExpensesModal";

const TryItOut = () => {
  const [saldo, setSaldo] = useState<number>(0); // Current balance
  const [income, setIncome] = useState<number>(0);
  const [incomeValues, setIncomeValues] = useState<IncomeValues>({
    Salary: 0,
    Kela: 0,
    Savings: 0,
    Other: 0,
  });
  const [expenses, setExpenses] = useState<number>(0);
  const [expenseValues, setExpenseValues] = useState<ExpenseValues>({
    Rent: 0,
    Bills: 0,
    Shopping: 0,
    Savings: 0,
    Restaurant: 0,
    Pets: 0,
    Transport: 0,
    Food: 0,
    Other: 0,
  });
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expensesModalOpen, setExpensesModalOpen] = useState(false);

  // Change the current balance everytime the income or expenses change

  useEffect(() => {
    setSaldo(parseFloat((income - expenses).toFixed(2)));
  }, [income, expenses]);

  // Open the income / expenses modal

  const handleOpenIncome = () => {
    console.log("lisaa massii");
    setIncomeModalOpen(true);
  };

  const handleOpenExpenses = () => {
    console.log("lisaa menoja");
    setExpensesModalOpen(true);
  };

  // Closes the income / expenses modal and sets the new balance

  const handleCloseIncome = (newBalance: number, incomeType: IncomeType) => {
    setIncomeModalOpen(false);
    if (!isNaN(newBalance)) {
      setIncome(income + newBalance); // Sets the total incomes
      setIncomeValues((prev) => ({
        // Sets income by type
        ...prev,
        [incomeType]: prev[incomeType] + newBalance,
      }));
    }
  };

  const handleCloseExpenses = (
    newBalance: number,
    expenseType: ExpenseType
  ) => {
    setExpensesModalOpen(false);
    if (!isNaN(newBalance)) {
      setExpenses(expenses + newBalance);
      setExpenseValues((prev) => ({
        ...prev,
        [expenseType]: prev[expenseType] + newBalance,
      }));
    }
  };

  console.log("expenseValues", expenseValues);

  // RETURN

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
          <div>Salary {incomeValues.Salary.toFixed(2)}</div>
          <div>Kela {incomeValues.Kela.toFixed(2)}</div>
          <div>Other {incomeValues.Other.toFixed(2)}</div>
          <div className="income-expenses">
            <h3 style={{ color: "var(--primarylight)" }}>
              +{income.toFixed(2)} €
            </h3>
            <h3 style={{ color: "var(--secondary)" }}>
              -{expenses.toFixed(2)} €
            </h3>

            {/* How to display only the expenses with value > 0 */}

            {expenses > 0 && (
              <div className="expenses">
                <h4>Expenses</h4>
                {Object.entries(expenseValues).map(([expenseType, value]) => {
                  if (value > 0) {
                    return (
                      <div key={expenseType}>
                        <div>
                          {expenseType} {value.toFixed(2)}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
        <div className="balance-stuff">
          <div className="balance-button" title="Click for more info!">
            <button className="saldo-button-side">-</button>
            <button
              className="saldo-button-center"
              style={{
                backgroundColor:
                  saldo > 0 ? "var(--primarylight)" : "var(--secondary)",
              }}
            >
              balance {saldo}€
            </button>
            <button className="saldo-button-side">-</button>
          </div>
          <div className="money-buttons">
            <button
              className="income-button"
              onClick={handleOpenIncome}
              title="Add income"
            >
              +
            </button>
            <button
              className="expenses-button"
              onClick={handleOpenExpenses}
              title="Add expense"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryItOut;
