import { Elysia } from "elysia";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { Logged, LoginCredentials, Token } from "../utils/types";
import { isJwtPayload } from "../utils/typeguard";

const loginRouter = new Elysia({ prefix: "/login" })

  // login

  .post("/", async ({ body, set }) => {
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
  })

  .get("/", async ({ request, set }) => {
    const getTokenFrom = (request: Request) => {
      const authorization = request.headers.get("Authorization");
      if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
      }
      return null;
    };

    const token = getTokenFrom(request);

    if (!token) {
      set.status = 401;
      return { message: "Invalid token!", style: "info-error" };
    }
    // console.log("token", token);
    try {
      const decoded = jwt.verify(token, `${Bun.env.SECRET}`);

      if (isJwtPayload(decoded)) {
        const validUser = (await UserModel.findById(decoded.id)) as JwtPayload;
        set.status = 200;
        return { validUser, token };
      } else {
        set.status = 400;
        return { message: "Invalid token format!", style: "info-error" };
      }
    } catch (error: unknown) {
      console.error("Error verifying token", error);
      set.status = 401;
      return { message: "invalid token format", style: "info-error" };
    }
  });

export { loginRouter };
