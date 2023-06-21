const express = require("express");
// const path = require("path");
require("dotenv").config(); // Secures variables

const app = require("./utils/app"); // Backend App (server)

// const cors = require("cors");
const { PORT } = require("./constants");

// mongo.connect();

var http = require("http").createServer(app);
let io = http.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});

