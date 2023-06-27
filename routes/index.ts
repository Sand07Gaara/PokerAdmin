export const express = require('express');

const app = express();

const authRoutes = require('./auth')
const tournamentRoutes = require('./tournament');

app.use('/auth', authRoutes);
app.use('/tournament', tournamentRoutes);

module.exports = app;