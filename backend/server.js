const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const subscribeRoute = require("./routes/subscribe");
app.use("/api/subscribe", subscribeRoute);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Listen on port (Vercel provides PORT via environment variables)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
