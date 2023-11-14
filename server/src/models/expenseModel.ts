import mongoose from "mongoose";
import { ExpenseType } from "../utils/types";

const expenseSchema = new mongoose.Schema({
  value: Number,
  type: {
    type: String,
    enum: Object.values(ExpenseType),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

expenseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ExpenseModel = mongoose.model("Expense", expenseSchema);

export { ExpenseModel };
