const prizeRepository = require('./prize-repository');

async function getPrizeList() {
  return prizeRepository.getPrizeList();
}

async function updateSisa() {
  return prizeRepository.updateSisa();
}

module.exports = {
  getPrizeList,
  updateSisa,
};
