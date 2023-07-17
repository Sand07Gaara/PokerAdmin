import { Request, Response, NextFunction } from "express";
require("dotenv").config(); // Secures variables

const app = require("./utils/app"); // Backend App (server)
const cosmos = require("./utils/cosmos"); // Cosmos DB
const cosmos_mongo = require("./utils/cosmos_mongo"); //Cosmos Mongo

const Routes = require("./routes");
const cors = require("cors");
const { PORT } = require("./constants");

app.use("/api", Routes);
app.use(cors({
    origin: '*'
}));

cosmos.checkConnection();
cosmos_mongo.connection();

var http = require("http").createServer(app);

let io = http.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});
