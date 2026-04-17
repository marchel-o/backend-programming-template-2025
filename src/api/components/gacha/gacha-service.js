/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */
const gachaRepository = require('./gacha-repository');
const prizeRepository = require('../prize/prize-repository');

async function roll(userId) {
  const cekRoll = await gachaRepository.cekRoll(userId);

  if (!cekRoll) {
    return {
      msg: 'Limit roll sudah tercapai (5 kali roll)',
    };
  }

  const randomNum = Math.floor(Math.random() * 100) + 1;
  const prizeList = await prizeRepository.getPrizeList();

  const incrementStatus = await gachaRepository.updateRollAmount(userId, 1);

  let prizeWon = null;
  if (randomNum < 5) {
    prizeWon = prizeList[0];
  } else if (randomNum < 10) {
    prizeWon = prizeList[1];
  } else if (randomNum < 15) {
    prizeWon = prizeList[2];
  } else if (randomNum < 20) {
    prizeWon = prizeList[3];
  } else if (randomNum < 30) {
    prizeWon = prizeList[4];
  } else {
    await gachaRepository.addToHistory(userId, 'None', 'None');
    await prizeRepository.addToGlobalHistory(userId, 'None', 'None');
    return {
      msg: 'Tidak beruntung :(',
      incrementStatus,
    };
  }

  if (prizeWon.sisa === 0) {
    await gachaRepository.addToHistory(userId, 'None', 'None');
    await prizeRepository.addToGlobalHistory(userId, 'None', 'None');
    return {
      msg: 'Tidak berhasil, kuota sudah habis',
      prize: prizeWon.nama,
    };
  }

  await gachaRepository.addToHistory(userId, prizeWon._id, prizeWon.nama);

  await prizeRepository.addToGlobalHistory(userId, prizeWon._id, prizeWon.nama);

  await prizeRepository.updateSisa(prizeWon._id, -1);

  const newPrize = await prizeRepository.getPrizeById(prizeWon._id);

  return {
    msg: 'Berhasil',
    prize: newPrize,
    incrementStatus,
  };
}

async function resetRoll(userId) {
  const success = await gachaRepository.resetRollAmount(userId);
  return success;
}

async function getHistory(userId) {
  const success = await gachaRepository.getHistory(userId);
  return success;
}

module.exports = {
  roll,
  resetRoll,
  getHistory,
};
