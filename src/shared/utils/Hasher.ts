import crypto from "node:crypto";

export default (data: any) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};
