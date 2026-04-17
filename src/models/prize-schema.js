module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema({
      nama: String,
      kuota: Number,
      sisa: Number,
    })
  );
