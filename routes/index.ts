export const express = require("express");

const app = express();

const authRoutes = require("./auth");
const tournamentRoutes = require("./tournament");
const userRoutes = require("./user");
const tournamentTypeRoutes = require("./tournament_type");
const gameTypeRoutes = require("./game_type");
const handHistoryRoutes = require("./hand_history");

app.use("/auth", authRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/user", userRoutes);
app.use("/tournament/type", tournamentTypeRoutes);
app.use("/game/type", gameTypeRoutes);
app.use("/handhistory", handHistoryRoutes);

module.exports = app;
