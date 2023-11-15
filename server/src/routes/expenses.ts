import { Elysia } from "elysia";
import { ExpenseModel } from "../models/expenseModel";
import { NewExpense } from "../utils/types";
import { validUser } from "../utils/utils";
import { UserModel } from "../models/userModel";

const expenseRouter = new Elysia({ prefix: "/expenses" })

  // expenses

  .get("/", async () => {
    const expenses = await ExpenseModel.find({}).populate("user", { email: 1 });
    // console.log("expenses", expenses);
    return expenses;
  })

  .post("/", async ({ request, body, set }) => {
    try {
      const expense = body as NewExpense;

      // Check that the token is valid
      const validateUser = await validUser(request, { status: 200 });
      if (validateUser) {
        // console.log("expense", expense.userId);

        const getUser = await UserModel.findById(expense.userId);
        if (!getUser) {
          set.status = 403;
          return { message: "Unauhtorized" };
        }

        const addMoney = new ExpenseModel({
          value: expense.value,
          type: expense.type,
          user: getUser._id,
        });

        const savedExpense = await addMoney.save();
        getUser.expenses = getUser.expenses.concat(savedExpense._id);
        await getUser.save();
        // console.log("svadeExpense", savedExpense);

        set.status = 201;
        return {
          savedExpense,
          message: `Added expense!`,
          style: "info-success",
        };

        // If token isn't valid
      } else {
        set.status = 403;
        return { message: "Unauhtorized" };
      }
      // console.log("token", token);
    } catch (error) {
      set.status = 500;
      console.log("Server error", error);
    }
  })

  // expenses/:email

  .get("/:email", async ({ params, request, set }) => {
    try {
      const email = params.email;

      // Check that the token is valid

      const validateUser = await validUser(request, { status: 200 });
      if (validateUser) {
        // Check that the there is an user with the email
        const getUser = await UserModel.findOne({ email: email });
        if (!getUser) {
          set.status = 404;
          return { message: "Email not found" };
        } else {
          // Get all Expenses with the user id
          const myExpenses = await ExpenseModel.find({ user: getUser._id });

          // Get total expenses
          const totalExpenses = await ExpenseModel.aggregate([
            {
              $match: { user: getUser._id },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$value" },
              },
            },
          ]);

          return { myExpenses, totalExpenses };
        }
      }
    } catch (error: unknown) {
      console.log("expenses/email error", error);
      set.status = 500;
    }
  })

  .delete("/:id", async ({ params, request, set }) => {
    try {
      const id = params.id;

      // Check that the token is valid

      const validateUser = await validUser(request, { status: 200 });
      console.log("validateUser", validateUser.validUser?._id);
      if (validateUser) {
        const toDelete = await ExpenseModel.findById(id);

        const deletedValue = toDelete?.value;

        // Check that the user deletes own expense
        if (
          validateUser.validUser?._id.toString() === toDelete?.user?.toString()
        ) {
          await ExpenseModel.findByIdAndDelete(id);
          set.status = 200;

          return { message: "Item deleted.", value: deletedValue };
        } else {
          set.status = 401;
          return { error: "You can't remove this item." };
        }
      } else {
        set.status = 404;
        return { message: "User not found" };
      }
    } catch (error: unknown) {
      console.log("expenses/id error", error);
      set.status = 500;
    }
  });

export { expenseRouter };
