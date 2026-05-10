const { providerStatus } = require("./_stockpilot");

module.exports = (req, res) => {
  res.status(200).json(providerStatus());
};
