const { Users, UserHistory } = require('../../../models');

async function cekRoll(userId) {
  const user = await Users.findById(userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastRoll = new Date(user.lastRoll);
  lastRoll.setHours(0, 0, 0, 0);

  if (lastRoll.getTime() !== today.getTime()) {
    await Users.findByIdAndUpdate(userId, {
      $set: { rolls: 0, lastRoll: new Date() },
    });
    return true;
  }

  return user.rolls < 5;
}

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

async function addToHistory(userId, prizeId, prizeName) {
  return UserHistory.create({
    userId,
    prizeId,
    prizeName,
  });
}

async function getHistory(userId) {
  return UserHistory.find({ userId });
}

module.exports = {
  cekRoll,
  updateRollAmount,
  resetRollAmount,
  addToHistory,
  getHistory,
};
