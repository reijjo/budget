import { JwtPayload } from "jsonwebtoken";

export function isJwtPayload(
  decoded: string | JwtPayload
): decoded is JwtPayload {
  return (decoded as JwtPayload).id !== undefined;
}
