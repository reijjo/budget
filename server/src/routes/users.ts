import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel";
import { RegisterInfo } from "../utils/types";
import isValid from "../utils/validateInput";

const usersRouter = new Elysia({ prefix: "/users" })

  // users

  .get("/", async () => {
    const users = await UserModel.find({}).populate("incomes", {
      value: 1,
      type: 1,
    });
    // .populate("expenses");
    return users;
  })

  .post("/", async ({ body, set }) => {
    const { email, passwd, passwd2 } = body as RegisterInfo;

    // Validation checks

    const validPasswdnot = isValid.passwdCheck(passwd);
    const passwdMatchnot = isValid.passwd12Check(passwd, passwd2);
    const validEmailnot = isValid.emailCheck(email);

    if (validEmailnot) {
      return { message: validEmailnot.message, style: validEmailnot.style };
    } else if (validPasswdnot) {
      return { message: validPasswdnot.message, style: validPasswdnot.style };
    } else if (passwdMatchnot) {
      return { message: passwdMatchnot.message, style: passwdMatchnot.style };
    }

    // Is email in use check

    const user = await UserModel.findOne({ email: email });
    if (user) {
      set.status = 400;
      return { message: "Email is already in use", style: "info-warning" };
    }

    // Hash the password

    const saltRounds = 10;
    const passwdHash = await bcrypt.hash(passwd, saltRounds);

    // Add use to database

    const newUser = new UserModel({
      email: email,
      passwd: passwdHash,
      // passwd: passwd,
    });

    try {
      const savedUser = await newUser.save();
      set.status = 201;

      return {
        message: `You can login with '${savedUser.email}' now!`,
        style: "info-success",
      };
      // return `${savedUser.email} registered!`;
    } catch (error: unknown) {
      set.status = 500;
      return { message: "Error on server side.", style: "info-error" };
    }
  })

  // users/:email

  .get("/:email", async ({ params, set }) => {
    try {
      const { email } = params;

      const itsMe = await UserModel.findOne({ email: email })
        .select("-passwd")
        .populate("incomes");
      // .populate("expenses");
      console.log("itsMe", email);
      set.status = 200;
      return itsMe;
    } catch (error: unknown) {
      console.log("error getting ME", error);
      set.status = 500;
      return { message: "Error on server side.", style: "info-error" };
    }
  });

export { usersRouter };
