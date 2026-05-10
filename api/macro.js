const { macro } = require("./_stockpilot");

module.exports = async (req, res) => {
  try {
    res.status(200).json(await macro());
  } catch (error) {
    res.status(502).json({ error: error.message, updatedAt: new Date().toISOString() });
  }
};
