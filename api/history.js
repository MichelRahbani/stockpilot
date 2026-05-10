const { history } = require("./_stockpilot");

module.exports = async (req, res) => {
  try {
    res.status(200).json(await history(req.query));
  } catch (error) {
    res.status(502).json({ error: error.message, updatedAt: new Date().toISOString() });
  }
};
