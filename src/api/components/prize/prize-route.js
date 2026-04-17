const express = require('express');

const prizeController = require('./prize-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/rewards', route);

  route.get('/', prizeController.getPrizeList);

  // route.post('/', prizeController.createBook);

  // TODO: Get a book by id

  // TODO: Update a book by id

  // TODO: Delete a book by id
};
