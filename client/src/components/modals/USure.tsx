import { Dispatch, SetStateAction } from "react";
import { ExpenseValues, IncomeValues } from "../../utils/types";
import expenseAPI from "../../api/expense-api";
import { verifyUser } from "../../utils/middleware";
import { nullValuesExpense, nullValuesIncome } from "../../utils/valueHelp";
import incomeAPI from "../../api/income-api";

type sureProps = {
  setYouSure: Dispatch<SetStateAction<boolean>>;
  setExpensesArray: Dispatch<SetStateAction<ExpenseValues[]>>;
  setIncomesArray: Dispatch<SetStateAction<IncomeValues[]>>;
  expensesArray: ExpenseValues[];
  incomesArray: IncomeValues[];
  itemToDelete: IncomeValues | ExpenseValues | null;
  whatType: string;

  setExpenses: Dispatch<SetStateAction<number>>;
  expenses: number;
  setExpenseValues: Dispatch<SetStateAction<ExpenseValues>>;

  setIncome: Dispatch<SetStateAction<number>>;
  income: number;
  setIncomeValues: Dispatch<SetStateAction<IncomeValues>>;
};

const USure = ({
  setYouSure,
  itemToDelete,
  whatType,
  setExpensesArray,
  expensesArray,
  setExpenses,
  expenses,
  setExpenseValues,

  setIncomesArray,
  incomesArray,
  setIncome,
  income,
  setIncomeValues,
}: sureProps) => {
  // console.log('USure expenseValues', expenseValues)

  // Finish delete

  const removeItem = async (id: string, what: string) => {
    if (what === "income") {
      const verify = await verifyUser();
      if (verify && verify.user && verify.auth === true) {
        // Verify and delete
        incomeAPI.setToken(verify.user.token);
        const deletedIncome = await incomeAPI.deleteIncome(id);

        // Set income array without the deleted item
        const updatedArray = incomesArray.filter(
          (expense) => String(expense.id) !== String(id)
        );
        setIncomeValues(nullValuesIncome);

        const updatedIncome = incomesArray.reduce(
          (acc: IncomeValues, expense: IncomeValues) => {
            acc[expense.type] += expense.value;
            return acc;
          },
          { ...nullValuesIncome }
        );

        console.log("updated", updatedArray);
        setIncomeValues(updatedIncome);
        setIncomesArray(updatedArray);
        setIncome(income - deletedIncome.value);
        setYouSure(false);
      }
    } else if (what === "expense") {
      const verify = await verifyUser();

      if (verify && verify.user && verify.auth === true) {
        // Verify and delete

        expenseAPI.setToken(verify.user.token);
        const deletedExpense = await expenseAPI.deleteExpense(id);

        // Set expense array without the deleted item
        const updatedArray = expensesArray.filter(
          (expense) => String(expense.id) !== String(id)
        );
        setExpenseValues(nullValuesExpense);

        const updatedExpense = expensesArray.reduce(
          (acc: ExpenseValues, expense: ExpenseValues) => {
            acc[expense.type] += expense.value;
            return acc;
          },
          { ...nullValuesExpense }
        );

        console.log("updated", updatedArray);
        setExpenseValues(updatedExpense);
        setExpensesArray(updatedArray);
        setExpenses(expenses - deletedExpense.value);
        setYouSure(false);
      } else {
        window.location.replace("/fake");
      }
    }
  };

  return (
    <div className="youSure">
      <div>
        <div>Are you sure you want to delete</div>
        <div>
          '{itemToDelete?.type} {itemToDelete?.value}€ ?'
        </div>
      </div>
      <div>
        <button
          className="my-btn outline-btn"
          style={{
            padding: "8px 16px",
            fontSize: "0.9rem",
            width: "calc(50% - 8px)",
            marginRight: "8px",
          }}
          onClick={() => setYouSure(false)}
        >
          Cancel
        </button>
        <button
          className="my-btn filled-btn"
          style={{
            padding: "8px 16px",
            fontSize: "0.9rem",
            width: "calc(50% - 8px)",
            marginLeft: "8px",
          }}
          onClick={() => removeItem(String(itemToDelete?.id), whatType)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default USure;
