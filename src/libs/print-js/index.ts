"use client";

import { Configuration } from "./types";

var printJS: (config: Configuration) => void;

if (typeof window !== undefined && typeof window !== "undefined") {
  printJS = require("print-js");
}

export { printJS };
