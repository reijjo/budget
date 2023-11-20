import mongoose from "mongoose";
import supertest from "supertest";
import { app } from "../index";
import { expect, test, beforeAll, afterAll, describe } from "bun:test";
import { mongoConnect } from "../utils/utils";

const mockApp = {
  address() {
    return {
      port: 3001,
      address: "localhost",
    };
  },
};

// const api = supertest(app);
const api = supertest(mockApp);

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});

describe("Some basic user stuff", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await mongoConnect();
  });

  // test("Get all users", async () => {
  //   // const res = await fetch(userAPI);
  //   // // console.log("res", res);
  //   // const users = await res.json();
  //   // console.log("users", users[0]);
  //   // expect(res.status).toBe(200);
  //   const users = await UserModel.find({});
  //   console.log("users", users);
  // });

  test("SUPERTEST", async () => {
    const ok = await api.get("/users");
    console.log("ok", ok.body);
    console.log("ok status", ok.status);
    expect(ok.status).toBe(200);
    // console.log("test", ok);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
