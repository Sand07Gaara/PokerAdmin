export const express = require('express');

const app = express();

const authRoutes = require('./auth')
const tournamentRoutes = require('./tournament');
const userRoutes = require('./user')

app.use('/auth', authRoutes);
app.use('/tournament', tournamentRoutes);
app.use('/user', userRoutes);

module.exports = app;