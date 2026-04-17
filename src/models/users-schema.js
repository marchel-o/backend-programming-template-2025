module.exports = (db) =>
  db.model(
    'Users',
    db.Schema({
      email: String,
      password: String,
      fullName: String,
      rolls: { type: Number, default: 0 },
      lastRoll: { type: Date, default: Date.now },
    })
  );
