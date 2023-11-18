import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel";
import { ChangePw, RegisterInfo } from "../utils/types";
import nodemailer from "nodemailer";
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
    const emailHash = await bcrypt.hash(email, saltRounds);

    const verifycode = `${emailHash}${passwdHash}`;
    const base64code = Buffer.from(verifycode).toString("base64");

    console.log("verifycode", verifycode);
    console.log("base64code", base64code);

    // Add use to database

    const newUser = new UserModel({
      email: email,
      passwd: passwdHash,
      code: base64code,
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

  .post("/:email", async ({ params: { email }, set }) => {
    try {
      // Check that email is valid
      const validEmailnot = isValid.emailCheck(email);
      if (validEmailnot) {
        return { message: validEmailnot.message, style: validEmailnot.style };
      } else {
        // If valid email we check if there is that email in database
        const user = await UserModel.findOne({ email: email });
        if (user) {
          // Get the verifycode
          const theCode = user.code;
          // For sending email
          const transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
              user: `${Bun.env.EMAIL_USERNAME}`,
              pass: `${Bun.env.EMAIL_PASSWORD}`,
            },
          });

          // Options for sending email
          const options = {
            from: `${Bun.env.EMAIL_USERNAME}`,
            to: email,
            subject: "Hola! Link for changing THE BAG password.",
            html: `
							<h3>click the link</h3><br />
							<a href="http://localhost:5173/forgot/${theCode}"> HERE </a><br />
							<p>Thanks.</p>`,
          };

          // Send link for changing password
          try {
            const mailInfo = await transporter.sendMail(options);
            console.log("Email sent", mailInfo);
            set.status = 200;
            return {
              message: `You got mail at '${email}'`,
              style: "info-success",
            };
          } catch (error: unknown) {
            console.log("Error sending mail", error);
            set.status = 400;
            return {
              message: `Error sending email to ${user.email}`,
              style: "info-error",
            };
          }
        } else {
          // If there isnt a user in database with that email
          set.status = 404;
          return {
            message: `'${email}' is not registered.`,
            style: "info-error",
          };
        }
      }
    } catch (error) {
      set.status = 500;
      console.log("Error sending email", error);
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
  })

  .put("/forgot/:code", async ({ params: { code }, body, set }) => {
    try {
      const { passwd, passwd2 } = body as ChangePw;

      // Validation checks
      const validPasswdnot = isValid.passwdCheck(passwd);
      const passwdMatchnot = isValid.passwd12Check(passwd, passwd2);

      if (validPasswdnot) {
        return { message: validPasswdnot.message, style: validPasswdnot.style };
      } else if (passwdMatchnot) {
        return { message: passwdMatchnot.message, style: passwdMatchnot.style };
      }
      // Find user with verifycode
      const user = await UserModel.findOne({ code: code });

      console.log("user", user);

      // Hash the new password
      const saltRounds = 10;
      const passwdHash = await bcrypt.hash(passwd, saltRounds);

      console.log("old", user?.passwd);
      if (user) {
        user.passwd = passwdHash;
        await user.save();

        console.log("newä", user.passwd);

        // console.log("user", user);
        // console.log("updated", updatedUser);

        return {
          // user: updatedUser,
          message: "Password updated!",
          style: "info-success",
        };
      } else {
        return {
          message: `Something shady going on.`,
          style: "info-error",
        };
      }
    } catch (error: unknown) {
      console.log("error updating password", error);
      set.status = 500;
      return {
        message: "Error on server side.",
        style: "info-error",
      };
    }
  });

export { usersRouter };
