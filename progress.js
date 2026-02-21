export default function handler(req, res) {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "Missing user" });
  }

  const database = global.database || {};
  const completed = database[user]?.completed || 0;

  res.status(200).json({ completed });
}
