import { AuthRegisterReq } from "../../interfaces/auth/register";
import { createUser } from "./register";

export const login = require("./login");
export const register = require("./register");

const user: AuthRegisterReq = {
  email: "yutahamaguchi@nadja.biz",
  password: "",
};

createUser(user);
