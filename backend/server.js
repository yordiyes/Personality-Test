const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const oejtsRoutes = require("./src/routes/oejts-routes");
const enneagramRoutes = require("./src/routes/enneagram-routes");
const riasecRoutes = require("./src/routes/riasec-routes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use("/api/oejts", oejtsRoutes);
app.use("/api/enneagram", enneagramRoutes);
app.use("/api/riasec", riasecRoutes);

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
