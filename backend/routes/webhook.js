const express = require("express");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Shopify webhook to trigger notifications
router.post("/", async (req, res) => {
  const { id: productId, title: productTitle, variants } = req.body;

  // Check if the product is restocked
  if (variants.some(variant => variant.inventory_quantity > 0)) {
    const notifications = await Notification.find({ productId, notified: false });

    for (const notification of notifications) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: notification.email,
        subject: "Product Back in Stock!",
        text: `Good news! The product "${productTitle}" is back in stock. Visit our store to purchase.`,
      });

      notification.notified = true;
      await notification.save();
    }
  }

  res.sendStatus(200);
});

module.exports = router;
