import { Dispatch, SetStateAction, useState } from "react";
import { ExpenseValues, IncomeValues } from "../../../utils/types";
import { parseDate } from "../../../utils/middleware";
import USure from "../USure";

type Props = {
  setBalanceModalOpen: Dispatch<SetStateAction<boolean>>;
  incomesArray: IncomeValues[];
  setIncomesArray: Dispatch<SetStateAction<IncomeValues[]>>;
  setIncome: Dispatch<SetStateAction<number>>;
  income: number;
  setIncomeValues: Dispatch<SetStateAction<IncomeValues>>;
  expensesArray: ExpenseValues[];
  setExpensesArray: Dispatch<SetStateAction<ExpenseValues[]>>;
  setExpenses: Dispatch<SetStateAction<number>>;
  expenses: number;
  setExpenseValues: Dispatch<SetStateAction<ExpenseValues>>;
};

const UserBalance = ({
  setBalanceModalOpen,
  incomesArray,
  setIncomesArray,
  setIncome,
  income,
  setIncomeValues,
  expensesArray,
  setExpensesArray,
  setExpenses,
  expenses,
  setExpenseValues,
}: Props) => {
  const [youSure, setYouSure] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<
    IncomeValues | ExpenseValues | null
  >(null);
  const [whatType, setWhatType] = useState("");

  const deleteIncome = (income: IncomeValues) => {
    setItemToDelete(income);
    setWhatType("income");
    setYouSure(true);
  };

  const deleteExpense = (expense: ExpenseValues) => {
    setItemToDelete(expense);
    setWhatType("expense");
    setYouSure(true);
  };

  // console.log("youSure??", youSure);
  // console.log('Balance expenseValues', expenseValues)

  // RETURN

  return (
    <div className="inside-balancemodal">
      {/* Confirm window */}

      {youSure && (
        <USure
          setYouSure={setYouSure}
          itemToDelete={itemToDelete}
          whatType={whatType}
          setExpensesArray={setExpensesArray}
          expensesArray={expensesArray}
          setExpenses={setExpenses}
          expenses={expenses}
          setExpenseValues={setExpenseValues}
          setIncomesArray={setIncomesArray}
          incomesArray={incomesArray}
          setIncome={setIncome}
          income={income}
          setIncomeValues={setIncomeValues}
        />
      )}

      {/* END Confirm window */}

      <a
        className="link-nostyle nav-close-button"
        style={{ color: "var(--secondary2)" }}
        title="close nav"
        onClick={() => setBalanceModalOpen(false)}
      >
        x
      </a>
      <div className="inside-income">
        <h3>Incomes</h3>

        <div className="inside-grid">
          {incomesArray.map((income) => (
            <div key={income.id}>
              <div>
                <span style={{ fontSize: "0.8rem", marginRight: "8px" }}>
                  {parseDate(String(income.date)).date}
                </span>{" "}
                {income.type} {income.value}€
              </div>
              <button
                className="my-btn outline-btn"
                style={{ fontSize: "0.6rem", padding: "4px 8px" }}
                onClick={() => deleteIncome(income)}
                disabled={youSure === true}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses */}

      <div className="inside-expenses">
        <h3>Expenses</h3>
        <div className="inside-grid">
          {expensesArray.map((expense) => (
            <div key={expense.id}>
              <div>
                <span style={{ fontSize: "0.8rem", marginRight: "8px" }}>
                  {parseDate(String(expense.date)).date}
                </span>{" "}
                {expense.type} {expense.value}€
              </div>
              <button
                className="my-btn outline-btn"
                style={{ fontSize: "0.6rem", padding: "4px 8px" }}
                onClick={() => deleteExpense(expense)}
                disabled={youSure === true}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBalance;
