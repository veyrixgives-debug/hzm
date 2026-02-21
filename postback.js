let database = {}; // Temporary memory storage

export default function handler(req, res) {
  const { s1, lead_id, status } = req.query;

  if (!s1 || !lead_id) {
    return res.status(400).send("Missing parameters");
  }

  if (status !== "1") {
    return res.status(200).send("Ignored (not approved)");
  }

  if (!database[s1]) {
    database[s1] = {
      completed: 0,
      leads: new Set()
    };
  }

  // Prevent duplicate counting
  if (!database[s1].leads.has(lead_id)) {
    database[s1].leads.add(lead_id);
    database[s1].completed += 1;
  }

  return res.status(200).send("OK");
}
