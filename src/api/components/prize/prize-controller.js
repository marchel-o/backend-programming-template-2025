const prizeService = require('./prize-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getPrizeList(request, response, next) {
  try {
    const success = await prizeService.getPrizeList();

    if (!success) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Failed to get prize list');
    }

    return response.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

async function updateSisa(request, response, next) {
  try {
    const success = await prizeService.updateSisa();

    if (!success) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Failed to get reward item');
    }

    return response.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPrizeList,
  updateSisa,
};
