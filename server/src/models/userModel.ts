import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  passwd: String,
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
