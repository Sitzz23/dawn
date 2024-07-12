import { customAlphabet } from "nanoid";
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#abcdefghijklmnopqrstuvwxyz-";
export const nanoid = customAlphabet(alphabet, 6);
