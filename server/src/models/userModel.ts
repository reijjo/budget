import mongoose from "mongoose";
import { IncomeModel } from "./incomeModel";
import { ExpenseModel } from "./expenseModel";

const userSchema = new mongoose.Schema({
  email: String,
  passwd: String,
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: IncomeModel,
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ExpenseModel,
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
