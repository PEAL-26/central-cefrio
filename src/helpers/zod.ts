import { z, ZodTypeAny } from "zod";

export const numericString = (schema: ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === "string") {
      return parseFloat(a || "0");
    } else if (typeof a === "number") {
      return a;
    } else {
      return undefined;
    }
  }, schema);
