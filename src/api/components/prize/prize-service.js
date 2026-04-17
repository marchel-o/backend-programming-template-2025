const prizeRepository = require('./prize-repository');
const usersRepository = require('../users/users-repository');

async function getPrizeList() {
  return prizeRepository.getPrizeList();
}

async function updateSisa() {
  return prizeRepository.updateSisa();
}

async function getGlobalHistory() {
  const allHistory = await prizeRepository.getGlobalHistory();
  const cleanHistory = allHistory.filter(
    (history) => history.prizeId !== 'None'
  );

  const success = await Promise.all(
    cleanHistory.map(async (history) => {
      const user = await usersRepository.getUser(history.userId);
      const censoredName = user.fullName
        .split(' ')
        .map((part) => {
          if (part.length <= 2) return part;
          const firstChar = part[0];
          const lastChar = part[part.length - 1];
          const mid = '*'.repeat(part.length - 2);
          return firstChar + mid + lastChar;
        })
        .join(' ');

      return {
        hiddenUsername: censoredName,
        prizeId: history.prizeId,
        prizeName: history.prizeName,
      };
    })
  );

  return success;
}

async function resetSisa() {
  return prizeRepository.resetSisa();
}

module.exports = {
  getPrizeList,
  updateSisa,
  getGlobalHistory,
  resetSisa,
};
