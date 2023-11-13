import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ExpenseType,
  ExpenseValues,
  IncomeType,
  IncomeValues,
  Logged,
  UserData,
} from "../utils/types";

import BalanceModal from "../components/modals/try-it/BalanceModal";
import { verifyUser } from "../utils/middleware";
import userAPI from "../api/users-api";
import UserIncome from "../components/modals/UserIncome";
import incomeAPI from "../api/income-api";
import expenseAPI from "../api/expense-api";
import UserExpense from "../components/modals/UserExpense";
import Donitsi from "../components/charts/Donitsi";
import BarChart from "../components/charts/BarChart";
import UserBalance from "../components/modals/UserBalance";

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
  const [isLoading, setIsLoading] = useState(true);

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
          expenseAPI.setToken(verify.user.token);
          const allIncomes = await incomeAPI.getUserIncomes(email);
          const allExpenses = await expenseAPI.getUserExpenses(email);

          // Transform the data to correct format and set the values to matching type

          const updatedIncome = allIncomes.myIncomes.reduce(
            (acc: IncomeValues, income: IncomeValues) => {
              acc[income.type] += income.value;
              return acc;
            },
            { ...incomeValues }
          );
          const updatedExpense = allExpenses.myExpenses.reduce(
            (acc: ExpenseValues, expense: ExpenseValues) => {
              acc[expense.type] += expense.value;
              return acc;
            },
            { ...expenseValues }
          );

          setIncomeValues((prevValues) => {
            return { ...prevValues, ...updatedIncome };
          });
          setExpenseValues((prevValues) => {
            return { ...prevValues, ...updatedExpense };
          });

          setIncome(allIncomes.totalIncomes[0].total);
          setExpenses(allExpenses.totalExpenses[0].total);
        }
      } catch (error) {
        console.log("myIncome error", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user !== null) {
      myIncome(user?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, setIncomeValues, setIncome, setExpenseValues, setExpenses]);

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

  // console.log("expenseValues", expenseValues);

  // Return

  if (isLoading) {
    return (
      <>
        <h1>loading...</h1>
      </>
    );
  }

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
        <UserExpense
          handleCloseExpenses={handleCloseExpenses}
          setExpenses={setExpenses}
          userData={userData}
        />
      )}
      <div className="balance">
        {balanceModalOpen ? (
          <div className={`balance-modal ${balanceModalOpen ? "open" : ""}`}>
            <UserBalance />
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

export default Budget;
