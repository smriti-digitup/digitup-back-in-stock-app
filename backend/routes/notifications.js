const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// Save customer email when out of stock
router.post("/", async (req, res) => {
  const { email, productId, productTitle } = req.body;
  const newNotification = new Notification({ email, productId, productTitle });
  await newNotification.save();
  res.json({ success: true, message: "You will be notified when available." });
});

// Fetch pending notifications (For Admin Panel)
router.get("/", async (req, res) => {
  const notifications = await Notification.find({ notified: false });
  res.json(notifications);
});

module.exports = router;
