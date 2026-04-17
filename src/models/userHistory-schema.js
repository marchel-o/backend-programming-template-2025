module.exports = (db) =>
  db.model(
    'UserHistory',
    db.Schema({
      userId: { type: String, required: true },
      prizeId: { type: String, required: true },
      prizeName: { type: String, required: true },
    })
  );
