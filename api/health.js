const { providerStatus } = require("./_stockpilot");

module.exports = (req, res) => {
  res.status(200).json({ ok: true, name: "StockPilot Hosted API", providerStatus: providerStatus().providers, updatedAt: new Date().toISOString() });
};
