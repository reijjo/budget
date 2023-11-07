import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { LoginCredentials } from "../utils/types";

const loginRouter = new Elysia({ prefix: "/login" })

  // login

  .get("/", () => "loginroute")

  .post("/", async ({ body, set }) => {
    const { email, passwd } = body as LoginCredentials;

    console.log("email, passwd", email, passwd);

    // Checks if there is an user and if password is correct

    const user = await UserModel.findOne({ email });

    console.log("user", user);

    if (user && user.passwd) {
      const okPasswd = await bcrypt.compare(passwd, user.passwd);

      // If password is correct, create token

      if (okPasswd) {
        const userToken = {
          id: user._id,
          email: user.email,
        };

        const token = jwt.sign(userToken, `${Bun.env.SECRET}`);
        set.status = 200;
        return { token, user: user.email };

        // If invalid email / password
      } else {
        set.status = 401;
        return { message: "Check email and password.", style: "info-error" };
      }
    } else {
      set.status = 404;
      return { message: "No such user?!", style: "info-error" };
    }
  });

export { loginRouter };
