module.exports = (db) =>
  db.model(
    'GlobalHistory',
    db.Schema({
      userId: { type: String, required: true },
      prizeId: { type: String, required: true },
      prizeName: { type: String, required: true },
    })
  );
