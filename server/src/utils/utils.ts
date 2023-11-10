import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Token } from "./types";
import { UserModel } from "../models/userModel";
import { Context } from "elysia";

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

// Token

export const getTokenFrom = (request: Request) => {
  const authorization = request.headers.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.substring(7);
  }
};

export const validUser = async (request: Request, set: { status: number }) => {
  try {
    const token = getTokenFrom(request);

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
};
