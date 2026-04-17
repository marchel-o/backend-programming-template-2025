const express = require('express');

const prizeController = require('./prize-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/rewards', route);

  route.get('/', prizeController.getPrizeList);

  route.get('/global-history', prizeController.getGlobalHistory);

  route.put('/reset', prizeController.resetSisa);
};
