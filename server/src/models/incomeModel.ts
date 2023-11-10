import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  salary: Number,
  kela: Number,
  savings: Number,
  other: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
});

incomeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const IncomeModel = mongoose.model("Income", incomeSchema);

export { IncomeModel };
