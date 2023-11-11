import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { isAxiosError } from "axios";

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
  Logged,
  UserData,
} from "../utils/types";

import ExpensesModal from "../components/modals/ExpensesModal";
import BalanceModal from "../components/modals/BalanceModal";
import { verifyUser } from "../utils/middleware";
import userAPI from "../api/users-api";
import UserIncome from "../components/modals/UserIncome";
import incomeAPI from "../api/income-api";

type Props = {
  setUser: Dispatch<SetStateAction<Logged | null>>;
  user: Logged | null;
};
// Element starts

const Budget = ({ setUser, user }: Props) => {
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
  // const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    id: "",
    email: "",
    incomes: incomeValues,
    expenses: expenseValues,
  });

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

  // Validate token / user

  useEffect(() => {
    const check = async () => {
      const valid = await verifyUser();

      if (valid && valid.auth === true && valid.user) {
        setUser(valid.user);

        const userData = await userAPI.itsMe(valid.user.email);
        setUserData(userData);
      } else {
        window.localStorage.removeItem("budgetUser");
        setUser(null);
        window.location.replace("/fake");
      }
    };
    check();
  }, [setUser]);

  // Get incomes / expenses from database

  useEffect(() => {
    const myIncome = async (email: string) => {
      try {
        // Verify user first

        const verify = await verifyUser();
        if (verify && verify.user && verify.auth === true) {
          incomeAPI.setToken(verify.user.token);
          const allIncomes = await incomeAPI.getUserIncomes(email);
          console.log("allIncomes", allIncomes);
          if (allIncomes.length > 0) {
            const updatedIncome = allIncomes.myIncomes.map(
              (income: IncomeValues) => ({
                value: income.value,
                type: income.type,
              })
            );
            console.log("iupdated income", updatedIncome);
            setIncomeValues(updatedIncome);
          }
        }
      } catch (error) {
        console.log("myIncome error", error);
      }
    };
    if (user !== null) {
      myIncome(user?.email);
    }
  }, [user, setIncome]);

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

  console.log("INCOMEVALUES", incomeValues);
  console.log("BUDGET USERDATA", userData);

  return (
    <div id="try-it-out">
      {incomeModalOpen && (
        <UserIncome
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

export default Budget;
