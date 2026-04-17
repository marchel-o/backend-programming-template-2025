const gachaRepository = require('./gacha-repository');
const prizeRepository = require('../prize/prize-repository');

async function roll(userId) {
  const randomNum = Math.floor(Math.random() * 5);
  const prizeList = await prizeRepository.getPrizeList();
  const prizeWon = prizeList[randomNum];

  if (prizeWon.sisa === 0) {
    return {
      msg: 'Tidak berhasil, kuota sudah habis',
      prize: prizeWon.nama,
    };
  }

  await gachaRepository.addToHistory(userId, prizeWon);

  // eslint-disable-next-line no-underscore-dangle
  await prizeRepository.updateSisa(prizeWon._id, -1);

  const incrementStatus = await gachaRepository.updateRollAmount(userId, 1);

  return {
    msg: 'Berhasil',
    prize: prizeWon,
    incrementStatus,
  };
}

async function resetRoll(userId) {
  const success = await gachaRepository.resetRollAmount(userId);
  return success;
}

module.exports = {
  roll,
  resetRoll,
};
