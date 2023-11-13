import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import mongoose from "mongoose";
import { usersRouter } from "./routes/users";
import { mongoConnect, validUser } from "./utils/utils";
import { loginRouter } from "./routes/login";
import { incomeRouter } from "./routes/incomes";
import { expenseRouter } from "./routes/expenses";

const app = new Elysia();
app.use(cors());

app.get("/ping", () => "pong");
app.use(usersRouter);
app.use(loginRouter);
app.use(incomeRouter);
app.use(expenseRouter);

app.listen(Number(Bun.env.PORT));

mongoConnect();

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("MongoDB disconnected.");
  process.exit();
});
