require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const notificationsRoute = require("./routes/notifications");
const webhookRoute = require("./routes/webhook");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use("/api/notifications", notificationsRoute);
app.use("/api/webhook", webhookRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
