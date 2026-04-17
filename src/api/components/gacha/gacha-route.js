const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/:userId', gachaController.roll);

  route.get('/:userId', gachaController.getHistory);

  route.put('/:userId', gachaController.resetRoll);
};
