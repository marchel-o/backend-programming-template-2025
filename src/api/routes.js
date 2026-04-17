const express = require('express');

const prize = require('./components/prize/prize-route');
const users = require('./components/users/users-route');
const gacha = require('./components/gacha/gacha-route');

module.exports = () => {
  const app = express.Router();

  prize(app);
  users(app);
  gacha(app);

  return app;
};
