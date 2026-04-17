module.exports = (db) =>
  db.model(
    'Users',
    db.Schema({
      email: String,
      password: String,
      fullName: String,
      rolls: { type: Number, default: 0 },
      history: [
        {
          rewardId: { type: String, required: true },
          rewardName: { type: String, required: true },
        },
      ],
    })
  );
