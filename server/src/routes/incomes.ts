import { Elysia } from "elysia";
import { IncomeModel } from "../models/incomeModel";
import { IncomeValues, IncomeType, NewIncome } from "../utils/types";
import { getTokenFrom, validUser } from "../utils/utils";
import { UserModel } from "../models/userModel";

const incomeRouter = new Elysia({ prefix: "/incomes" })

  // incomes

  .get("/", async () => {
    const incomes = await IncomeModel.find({}).populate("user", { email: 1 });
    return incomes;
  })

  .post("/", async ({ request, body, set }) => {
    try {
      const income = body as NewIncome;

      // Check that the token is valid
      const validateUser = await validUser(request, { status: 200 });
      if (validateUser) {
        const getUser = await UserModel.findById(income.userId);
        if (!getUser) {
          set.status = 403;
          return { message: "Unauhtorized" };
        }

        const addMoney = new IncomeModel({
          value: income.value,
          type: income.type,
          user: getUser._id,
        });

        console.log("add", addMoney);

        const savedIncome = await addMoney.save();
        getUser.incomes = getUser.incomes.concat(savedIncome._id);
        await getUser.save();
        console.log("svadeINcome", savedIncome);

        set.status = 201;
        return { savedIncome, message: `Added income!`, style: "info-success" };

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

  // incomes/:email
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
          // Get all Incomes with the user id
          const myIncomes = await IncomeModel.find({ user: getUser._id });

          // Get total incomes
          const totalIncomes = await IncomeModel.aggregate([
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

          return { myIncomes, totalIncomes };
        }
      }
    } catch (error: unknown) {
      console.log("incomes/email error", error);
      set.status = 500;
    }
  })

  .delete("/:id", async ({ params, request, set }) => {
    try {
      const id = params.id;

      // Check that token is valid

      const validateUser = await validUser(request, { status: 200 });
      console.log("validateUser", validateUser.validUser?._id);
      if (validateUser) {
        const toDelete = await IncomeModel.findById(id);

        const deletedValue = toDelete?.value;

        // Check that the user deletes own expense
        if (
          validateUser.validUser?._id.toString() === toDelete?.user?.toString()
        ) {
          await IncomeModel.findByIdAndDelete(id);
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
      console.log("incomes/id error", error);
      set.status = 500;
    }
  });

export { incomeRouter };
