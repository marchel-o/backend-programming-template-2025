const { Prize, GlobalHistory } = require('../../../models');

async function getPrizeList() {
  return Prize.find();
}

async function getPrizeById(id) {
  return Prize.findById(id);
}

async function updateSisa(rewardId, val) {
  return Prize.findByIdAndUpdate(
    rewardId,
    { $inc: { sisa: val } },
    { new: true }
  );
}

async function addToGlobalHistory(userId, prizeId, prizeName) {
  return GlobalHistory.create({
    userId,
    prizeId,
    prizeName,
  });
}

async function getGlobalHistory() {
  return GlobalHistory.find({});
}

async function resetSisa() {
  await Prize.deleteMany();

  await Prize.insertMany([
    { nama: 'Emas 10 Gram', kuota: 1, sisa: 1 },
    { nama: 'Smartphone X', kuota: 5, sisa: 5 },
    { nama: 'Smartwatch Y', kuota: 10, sisa: 10 },
    { nama: 'Voucher Rp100.000', kuota: 100, sisa: 100 },
    { nama: 'Pulsa Rp50.000', kuota: 500, sisa: 500 },
  ]);

  return {
    msg: 'Berhasil mengganti data',
  };
}

module.exports = {
  getPrizeList,
  getPrizeById,
  updateSisa,
  addToGlobalHistory,
  getGlobalHistory,
  resetSisa,
};
