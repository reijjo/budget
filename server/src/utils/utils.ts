import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Token } from "./types";
import { UserModel } from "../models/userModel";

// Connect MongoDB

export const mongoConnect = async () => {
  console.log(`Connecting to...`);

  // const isTest = `${Bun.env.NODE_ENV}` === "test";
  const isTest = process.env.NODE_ENV === "test";

  console.log("istest", isTest);
  console.log("NODE_ENV", Bun.env.NODE_ENV);
  console.log("MONGODB_URI", Bun.env.MONGODB_URI);

  try {
    const ok = await mongoose.connect(
      // isTest ? `${Bun.env.TEST_MONGODB_URI}` : `${Bun.env.MONGODB_URI}`
      // `${Bun.env.MONGODB_URI}`
      process.env.MONGODB_URI as string
    );
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

export const checkTokenValidity = async (
  request: Request,
  set: { status: number },
  next: Function
) => {
  try {
    // Checks the token
    const token = getTokenFrom(request);

    if (token) {
      // Verifies the token
      const decodedToken = jwt.verify(token, `${Bun.env.SECRET}`) as Token;

      if (!decodedToken.id) {
        set.status = 401;
        return { message: "Invalid token.", style: "info-error" };
      }

      const user = await UserModel.findById(decodedToken.id);

      if (!user) {
        set.status = 401;
        return { message: "User not found.", style: "info-error" };
      }

      // If the token is valid, continue to the next middleware or route handler
      await next();
    } else {
      set.status = 401;
      return { message: "No token provided.", style: "info-error" };
    }
  } catch (error) {
    set.status = 401;
    console.log("Token verification error", error);
    return { message: "Invalid token.", style: "info-error" };
  }
};
