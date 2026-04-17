const { Users } = require('../../../models');

async function updateRollAmount(userId, val) {
  return Users.findByIdAndUpdate(
    userId,
    { $inc: { rolls: val } },
    { new: true }
  );
}

async function resetRollAmount(userId) {
  return Users.findByIdAndUpdate(userId, { $set: { rolls: 0 } }, { new: true });
}

async function addToHistory(userId, reward) {
  return Users.findByIdAndUpdate(
    userId,
    {
      $push: {
        history: {
          // eslint-disable-next-line no-underscore-dangle
          rewardId: reward._id,
          rewardName: reward.nama,
        },
      },
    },
    { new: true }
  );
}

// async function updateHistory(id, item){

// }

module.exports = {
  updateRollAmount,
  resetRollAmount,
  addToHistory,
};
