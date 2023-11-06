import { Elysia } from "elysia";
import { UserModel } from "../models/userModel";
import { User } from "../utils/types";
import isValid from "../utils/validateInput";

const usersRouter = new Elysia({ prefix: "/users" })

  // users

  .get("/", async () => {
    const users = await UserModel.find({});
    return users;
  })

  .post("/", async ({ body, set }) => {
    const { email, passwd, passwd2 } = body as User;

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

    // Add use to database

    const newUser = new UserModel({
      email: email,
      passwd: passwd,
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
  });

export { usersRouter };
