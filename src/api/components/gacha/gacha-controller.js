const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function roll(request, response, next) {
  try {
    const { userId } = request.params;

    const success = await gachaService.roll(userId);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

async function resetRoll(request, response, next) {
  try {
    const { userId } = request.params;

    const success = await gachaService.resetRoll(userId);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const { userId } = request.params;

    const success = await gachaService.getHistory(userId);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json(success);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  roll,
  resetRoll,
  getHistory,
};
