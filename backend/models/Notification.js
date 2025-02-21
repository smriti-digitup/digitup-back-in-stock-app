const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  productTitle: { type: String, required: true },
  notified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Notification", NotificationSchema);
