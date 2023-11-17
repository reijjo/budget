import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  passwd: String,
  code: String,
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.code;
  },
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel };
