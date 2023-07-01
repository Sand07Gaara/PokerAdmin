import { Request, Response, NextFunction } from "express";
require("dotenv").config(); // Secures variables

const app = require("./utils/app"); // Backend App (server)
const cosmos = require("./utils/cosmos"); // Cosmos DB
const mongo = require("./utils/mongo"); // MongoDB
const Routes = require("./routes");
const cors = require("cors");
const { PORT } = require("./constants");

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", Routes);
app.use(cors());

cosmos.checkConnection();
mongo.connect(); // Check MongoDB connection

var http = require("http").createServer(app);

let io = http.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});
