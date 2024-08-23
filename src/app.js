const express = require("express");
const connectDB = require("./config/connection");
const emailRoutes = require("./routes/emailRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", emailRoutes);

app.get("/", (req, res) => {
  res.send("Email Scheduler API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
