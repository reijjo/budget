import mongoose from "mongoose";
import isValid from "./validateInput";

// Connect MongoDB

export const mongoConnect = async () => {
  console.log(`Connecting to...`);

  try {
    const ok = await mongoose.connect(`${Bun.env.MONGODB_URI}`);
    {
      ok && console.log("...connected to MongoDB!");
    }
  } catch (error: unknown) {
    console.log("...error connecting to MongoDB", error);
  }
};
