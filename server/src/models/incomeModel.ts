import mongoose from "mongoose";
import { IncomeType } from "../utils/types";

const incomeSchema = new mongoose.Schema({
  value: Number,
  type: {
    type: String,
    enum: Object.values(IncomeType),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
