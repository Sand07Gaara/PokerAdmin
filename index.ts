const express = require("express");
// const path = require("path");
require("dotenv").config(); // Secures variables

const app = require("./utils/app"); // Backend App (server)
const cosmos = require("./utils/cosmos") // Cosmos DB

// const cors = require("cors");
const { PORT } = require("./constants");

var http = require("http").createServer(app);

cosmos.checkConnection();
let io = http.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});