const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("./src/middleware/cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors);

// Example route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
