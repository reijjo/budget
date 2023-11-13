import { useEffect, useState } from "react";
import {
  ExpenseType,
  ExpenseValues,
  IncomeType,
  IncomeValues,
} from "../utils/types";

import IncomeModal from "../components/modals/try-it/IncomeModal";
import ExpensesModal from "../components/modals/try-it/ExpensesModal";
import BalanceModal from "../components/modals/try-it/BalanceModal";
import Donitsi from "../components/charts/Donitsi";
import BarChart from "../components/charts/BarChart";

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
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [expensePercent, setExpensePercent] = useState<number[]>([]);
  // const [checkExpenses, setCheckExpenses] = useState(true)

  const userData = null;

  // Gets the percentages of every expense

  useEffect(() => {
    const totalExpense = Object.values(expenseValues).reduce(
      (total, value) => total + value,
      0
    );

    const percentages = Object.values(expenseValues).map(
      (value) => (value / totalExpense) * 100
    );

    setExpensePercent(percentages);
  }, [expenseValues]);

  // Change the current balance everytime the income or expenses change

  useEffect(() => {
    setSaldo(parseFloat((income - expenses).toFixed(2)));
  }, [income, expenses]);

  // Open the income / expenses / balance modal

  const handleOpenIncome = () => {
    console.log("lisaa massii");
    setIncomeModalOpen(true);
  };

  const handleOpenExpenses = () => {
    console.log("lisaa menoja");
    setExpensesModalOpen(true);
  };

  const handleBalanceModal = () => {
    setBalanceModalOpen(!balanceModalOpen);
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
    console.log("hadnelClose expenses ?");

    setExpensesModalOpen(false);
    if (!isNaN(newBalance)) {
      setExpenses(expenses + newBalance);
      setExpenseValues((prev) => ({
        ...prev,
        [expenseType]: prev[expenseType] + newBalance,
      }));
    }
  };

  console.log("expenseValues", expenseValues, "incomevalues", incomeValues);

  // RETURN

  return (
    <div id="try-it-out">
      {incomeModalOpen && (
        <IncomeModal
          handleCloseIncome={handleCloseIncome}
          setIncome={setIncome}
          userData={userData}
        />
      )}
      {expensesModalOpen && (
        <ExpensesModal
          handleCloseExpenses={handleCloseExpenses}
          setExpenses={setExpenses}
        />
      )}
      <div className="balance">
        {balanceModalOpen ? (
          <div className={`balance-modal ${balanceModalOpen ? "open" : ""}`}>
            <BalanceModal />
          </div>
        ) : (
          <div className="saldo">
            <div className="income-expenses">
              <Donitsi
                expenseValues={expenseValues}
                expensePercent={expensePercent}
                income={income}
                expenses={expenses}
              />
              <BarChart
                expenseValues={expenseValues}
                expensePercent={expensePercent}
                income={income}
                expenses={expenses}
              />
            </div>
          </div>
        )}

        <div className="balance-stuff">
          <div className="balance-button" title="Click for more info!">
            <button className="saldo-button-side" onClick={handleBalanceModal}>
              -
            </button>
            <button
              className="saldo-button-center"
              style={{
                backgroundColor:
                  saldo < 0 ? "var(--secondary)" : "var(--primarylight)",
              }}
              onClick={handleBalanceModal}
            >
              <span>balance</span> {saldo.toFixed(2)}€
            </button>
            <button className="saldo-button-side" onClick={handleBalanceModal}>
              -
            </button>
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
