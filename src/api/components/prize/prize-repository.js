const { Prize } = require('../../../models');

async function getPrizeList() {
  return Prize.find();
}

async function updateSisa(rewardId, val) {
  return Prize.findByIdAndUpdate(
    rewardId,
    { $inc: { sisa: val } },
    { new: true }
  );
}

module.exports = {
  getPrizeList,
  updateSisa,
};
