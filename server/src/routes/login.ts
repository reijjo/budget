import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { LoginCredentials, Token } from "../utils/types";
import { getTokenFrom } from "../utils/utils";

const loginRouter = new Elysia({ prefix: "/login" })

  // login

  .get("/", async ({ request, set }) => {
    try {
      const token = getTokenFrom(request);
      // validUser(request, set);

      if (token) {
        const decodedToken = jwt.verify(token, `${Bun.env.SECRET}`) as Token;
        if (!decodedToken.id) {
          set.status = 401;
          return { message: "Invalid token.", style: "info-error" };
        }

        const user = await UserModel.findById(decodedToken.id);
        set.status = 200;
        return { validUser: user };
      } else {
        return { message: "No token at all.", style: "info-error" };
      }
    } catch (error: unknown) {
      set.status = 401;
      console.log("decoded token error", error);
      return { message: "Invalid token", style: "info-error" };
    }
  })

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
          return {
            token,
            user: user.email,
          };

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
