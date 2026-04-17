const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/:userId', gachaController.roll);

  route.put('/:userId', gachaController.resetRoll);

//   route.get('/history', gachaController);

//   route.get('/rewards-left', gachaController);

//   route.get('/global-history', gachaController);
};
