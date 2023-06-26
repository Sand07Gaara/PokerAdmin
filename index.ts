import express, { Request, Response, NextFunction } from "express";
// import { createContainer, createUser } from './controllers/auth/register'
import { AuthRegisterReq } from "./interfaces/auth/register";
// const path = require("path");
require("dotenv").config(); // Secures variables

const user: AuthRegisterReq = {
  email: "yutahamaguchi@nadja.biz",
  password: "123qwe!@#QWE",
};

const app = require("./utils/app"); // Backend App (server)
const cosmos = require("./utils/cosmos"); // Cosmos DB
const Routes = require("./routes");
const cors = require("cors");
const { PORT } = require("./constants");

cosmos.checkConnection();
// cosmos.createDB();

// cosmos.createContainer();
// cosmos.createUser(user)

app.use("/api", Routes);
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

var http = require("http").createServer(app);

let io = http.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});
