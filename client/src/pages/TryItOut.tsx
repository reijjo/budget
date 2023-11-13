import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  // ChartConfiguration,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

import {
  ExpenseType,
  ExpenseValues,
  IncomeType,
  IncomeValues,
} from "../utils/types";

import IncomeModal from "../components/modals/try-it/IncomeModal";
import ExpensesModal from "../components/modals/try-it/ExpensesModal";
import BalanceModal from "../components/modals/try-it/BalanceModal";

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

  // Chart.js

  const donitsidata = {
    labels: Object.keys(expenseValues),
    datasets: [
      {
        label: "% of expenses",
        data: expensePercent,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(128, 0, 128, 0.5)",
          "rgba(0, 128, 0, 0.5)",
          "rgba(0, 0, 128, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(0, 128, 0, 1)",
          "rgba(0, 0, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
    setExpensesModalOpen(false);
    if (!isNaN(newBalance)) {
      setExpenses(expenses + newBalance);
      setExpenseValues((prev) => ({
        ...prev,
        [expenseType]: prev[expenseType] + newBalance,
      }));
    }
  };

  console.log("expenseValues", incomeValues);

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
              <div className="donitsi">
                <Doughnut
                  data={donitsidata}
                  // options={donitsioptions}
                  // options={{ maintainAspectRatio: true, responsive: true }}
                />

                <div className="donitsi-label">
                  <h3 style={{ color: "var(--primarylight)" }}>
                    +{income.toFixed(2)} €
                  </h3>
                  <h3 style={{ color: "var(--secondary)" }}>
                    -{expenses.toFixed(2)} €
                  </h3>
                </div>
              </div>
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
