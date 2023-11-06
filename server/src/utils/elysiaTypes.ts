import { t } from "elysia";

export const credentials = t.Object({
  email: t.String(),
  passwd: t.String(),
});
