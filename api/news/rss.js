const { cachedFetch } = require("../_stockpilot");

module.exports = async (req, res) => {
  try {
    const xml = await cachedFetch(req.query.url || "", "text");
    res.setHeader("content-type", "application/xml; charset=utf-8");
    res.status(200).send(xml);
  } catch (error) {
    res.status(502).json({ error: error.message, updatedAt: new Date().toISOString() });
  }
};
