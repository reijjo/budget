import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { Logged, LoginCredentials, Token } from "../utils/types";
import { isJwtPayload } from "../utils/typeguard";

const loginRouter = new Elysia({ prefix: "/login" })

  // login

  .post("/", async ({ body, set }) => {
    try {
      const { email, passwd } = body as LoginCredentials;

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

          const token = jwt.sign(userToken, `${Bun.env.SECRET}`, {
            expiresIn: 60 * 60,
          });

          set.status = 200;
          return { token, user: user.email };

          // If invalid email / password
        } else {
          set.status = 401;
          return { message: "Check email and password.", style: "info-error" };
        }
        // Empty user
      } else {
        set.status = 404;
        return { message: "No such user?!", style: "info-error" };
      }
    } catch (error: unknown) {
      console.log("error on login", error);
      set.status = 500;
      return { error: "Error on server side." };
    }
  });

export { loginRouter };
