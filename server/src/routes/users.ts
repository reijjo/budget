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
      return { message: "Email is already in use.", style: "info-warning" };
    }

    // Hash the password & email for verification code

    const saltRounds = 10;
    const passwdHash = await bcrypt.hash(passwd, saltRounds);
    const emailHash = await bcrypt.hash(passwd, saltRounds);

    const verifycode = `${emailHash}${passwdHash}`;

    // Add use to database

    const newUser = new UserModel({
      email: email,
      passwd: passwdHash,
      code: verifycode,
    });

    try {
      const savedUser = await newUser.save();
      set.status = 201;

      return {
        message: `You can now login with '${savedUser.email}'`,
        style: "info-success",
      };
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
        .populate("incomes")
        .populate("expenses");
      set.status = 200;
      return itsMe;
    } catch (error: unknown) {
      console.log("error getting ME", error);
      set.status = 500;
      return { message: "Error on server side.", style: "info-error" };
    }
  })

  // users/forgot/:code
  .get("/forgot/:code", async ({ params: { code }, set }) => {
    try {
      // Find user with code from address
      const user = await UserModel.findOne({ code: code });
      console.log("user with code", user);
      return { user };
    } catch (error: unknown) {
      console.log("error getting ME", error);
      set.status = 500;
      return {
        message: "Error on server side while getting the code.",
        style: "info-error",
      };
    }
  });

export { usersRouter };
