import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  rent: Number,
  bills: Number,
  shopping: Number,
  savings: Number,
  restaurant: Number,
  pets: Number,
  transport: Number,
  food: Number,
  other: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
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
