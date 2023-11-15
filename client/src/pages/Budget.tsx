import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ExpenseType,
  ExpenseValues,
  IncomeType,
  IncomeValues,
  Logged,
  UserData,
} from "../utils/types";

import { verifyUser } from "../utils/middleware";
import userAPI from "../api/users-api";
import UserIncome from "../components/modals/user/UserIncome";
import incomeAPI from "../api/income-api";
import expenseAPI from "../api/expense-api";
import UserExpense from "../components/modals/user/UserExpense";
import Donitsi from "../components/charts/Donitsi";
import BarChart from "../components/charts/BarChart";
import UserBalance from "../components/modals/user/UserBalance";
import Loading from "../components/common/Loading";

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
  const [userData, setUserData] = useState<UserData>({
    id: "",
    email: "",
    incomes: incomeValues,
    expenses: expenseValues,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [incomesArray, setIncomesArray] = useState<IncomeValues[]>([]);
  const [expensesArray, setExpensesArray] = useState<ExpenseValues[]>([]);
  const nullValues = {
    Rent: 0,
    Bills: 0,
    Shopping: 0,
    Savings: 0,
    Restaurant: 0,
    Pets: 0,
    Transport: 0,
    Food: 0,
    Other: 0,
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
      setExpenseValues(nullValues);

      try {
        // Verify user first

        const verify = await verifyUser();
        if (verify && verify.user && verify.auth === true) {
          incomeAPI.setToken(verify.user.token);
          expenseAPI.setToken(verify.user.token);
          const allIncomes = await incomeAPI.getUserIncomes(email);
          const allExpenses = await expenseAPI.getUserExpenses(email);

          setIncomesArray(allIncomes.myIncomes);
          setExpensesArray(allExpenses.myExpenses);

          // Transform the data to correct format and set the values to matching type

          // if (incomesArray.length > 0) {
          const updatedIncome = await allIncomes.myIncomes.reduce(
            (acc: IncomeValues, income: IncomeValues) => {
              acc[income.type] += income.value;
              return acc;
            },
            { ...incomeValues }
          );

          setIncomeValues((prevValues) => {
            return { ...prevValues, ...updatedIncome };
          });

          // setIncome(incomesArray[0].total);
          setIncome(allIncomes.totalIncomes[0].total);
          // }

          if (expensesArray.length > 0) {
            const updatedExpense = expensesArray.reduce(
              (acc: ExpenseValues, expense: ExpenseValues) => {
                acc[expense.type] += expense.value;
                return acc;
              },
              { ...nullValues }
            );

            // console.log(
            //   "AFTER updatedExpense",
            //   expenseValues,
            //   "expenses",
            //   expenses
            // );

            // setExpenseValues((prevValues) => {
            //   return { ...prevValues, ...updatedExpense };
            // });
            setExpenseValues(updatedExpense);
            setExpenses(allExpenses.totalExpenses[0].total);
          } else {
            setExpenseValues(expenseValues);
            setExpenses(expenses);
          }
          // console.log("expenseVALUES BUDGET", expenseValues);
        }
      } catch (error) {
        console.log("myIncome error", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    if (user !== null) {
      myIncome(user?.email);
      console.log("LATAATKO KAIKEN>>??");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user,
    setIncomeValues,
    setIncome,
    setExpenseValues,
    setExpenses,
    balanceModalOpen,
    income,
    expenses,
  ]);

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

    // console.log("toimiiko percent", percentages);
  }, [expenseValues, expenses]);

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
    if (!isNaN(newBalance)) {
      setExpenses(expenses + newBalance);

      setExpenseValues((prev) => ({
        ...prev,
        [expenseType]: (prev[expenseType] += newBalance),
      }));
    }
    setExpensesModalOpen(false);
  };

  // console.log("Budget expenseValues", expenseValues);
  // console.log("EXPENSE ARRAY", expensesArray);
  // console.log("expenses", expenseValues);
  // console.log("balancemodal ", balanceModalOpen);

  // Return

  if (isLoading) {
    return <Loading />;
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
            <UserBalance
              setBalanceModalOpen={setBalanceModalOpen}
              incomesArray={incomesArray}
              setIncomesArray={setIncomesArray}
              expensesArray={expensesArray}
              setExpensesArray={setExpensesArray}
              setExpenses={setExpenses}
              expenses={expenses}
              setExpenseValues={setExpenseValues}
            />
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
