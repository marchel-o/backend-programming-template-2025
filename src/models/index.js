const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// Join the database connection string
const connectionString = new URL(config.database.connection);
connectionString.pathname += config.database.name;

mongoose.connect(`${connectionString.toString()}`);

const dbExports = {};

const db = mongoose.connection;
db.once('open', async () => {
  logger.info('Successfully connected to MongoDB');

  try {
    const { Prize } = dbExports;
    if (Prize) {
      const count = await Prize.countDocuments();
      if (count === 0) {
        logger.info('Prizes collection is empty. Seeding initial prizes...');
        await Prize.insertMany([
          { nama: 'Emas 10 Gram', kuota: 1, sisa: 1 },
          { nama: 'Smartphone X', kuota: 5, sisa: 5 },
          { nama: 'Smartwatch Y', kuota: 10, sisa: 10 },
          { nama: 'Voucher Rp100.000', kuota: 100, sisa: 100 },
          { nama: 'Pulsa Rp50.000', kuota: 500, sisa: 500 },
        ]);
        logger.info('Prizes seeded successfully!');
      }
    }
  } catch (error) {
    logger.error(error, 'Failed to seed initial prizes data');
  }
});

dbExports.db = db;

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

module.exports = dbExports;
