import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import mongoose from "mongoose";
import { usersRouter } from "./routes/users";
import { mongoConnect } from "./utils/utils";

const app = new Elysia();
app.use(cors());

app.get("/ping", () => "pong");
app.use(usersRouter);

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
