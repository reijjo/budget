// import mongoose from "mongoose";
// import supertest from "supertest";
import { expect, test /* beforeAll,	afterAll, describe */ } from "bun:test";
// import { mongoConnect } from "../utils/utils";
// import { UserModel } from "../models/userModel";

// const mockApp = {
//   address() {
//     return {
//       port: 3001,
//       address: "localhost",
//     };
//   },
// };

// const api = supertest(app);
// const api = supertest(mockApp);

test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});

// describe("Some basic user stuff", () => {
//   beforeAll(async () => {
//     process.env.NODE_ENV = "test";
//     await mongoConnect();
//     const deleted = await UserModel.deleteMany({});
//     console.log("deleted", deleted);
//   });

//   test("SUPERTEST", async () => {
//     console.log("ENV", process.env.NODE_ENV);
//     try {
//       const ok = await api.get("/users");
//       console.log("ok", ok);
//       console.log("ok status", ok.status);
//       expect(ok.status).toBe(200);
//       console.log("test", ok.body.length);
//     } catch (error) {
//       console.log("error", error);
//     }
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });
