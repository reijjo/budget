import { Dispatch, SetStateAction } from "react";
import { ExpenseValues, IncomeValues } from "../../utils/types";
import expenseAPI from "../../api/expense-api";
import { verifyUser } from "../../utils/middleware";

type sureProps = {
  setYouSure: Dispatch<SetStateAction<boolean>>;
  setExpensesArray: Dispatch<SetStateAction<ExpenseValues[]>>;
  expensesArray: ExpenseValues[];

  itemToDelete: IncomeValues | ExpenseValues | null;
  whatType: string;
};

const USure = ({
  setYouSure,
  itemToDelete,
  whatType,
  setExpensesArray,
  expensesArray,
}: sureProps) => {
  // Finish delete

  const removeItem = async (id: string, what: string) => {
    if (what === "income") {
      console.log("incomeID", id);
    } else if (what === "expense") {
      const verify = await verifyUser();

      if (verify && verify.user && verify.auth === true) {
        // Verify and delete

        expenseAPI.setToken(verify.user.token);
        await expenseAPI.deleteExpense(id);

        // Set expense array without the deleted item
        console.log("expedesesarra", expensesArray);
        const updatedArray = expensesArray.filter(
          (expense) => String(expense.id) !== String(id)
        );
        console.log("updated", updatedArray);
        setExpensesArray(updatedArray);

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
          className="my-btn filled-btn"
          style={{
            padding: "8px 16px",
            fontSize: "0.9rem",
            width: "calc(50% - 8px)",
            marginRight: "8px",
          }}
          onClick={() => removeItem(String(itemToDelete?.id), whatType)}
        >
          Delete
        </button>
        <button
          className="my-btn outline-btn"
          style={{
            padding: "8px 16px",
            fontSize: "0.9rem",
            width: "calc(50% - 8px)",
            marginLeft: "8px",
          }}
          onClick={() => setYouSure(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default USure;
