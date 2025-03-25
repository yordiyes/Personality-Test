const cors = require("cors");

const corsOptions = {
  origin: "*", // Adjust if needed
  credentials: true,
};

module.exports = cors(corsOptions);
