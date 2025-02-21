import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("https://your-api-url.com/api/notifications").then((res) => setNotifications(res.data));
  }, []);

  const notifyUsers = (productId) => {
    axios.post("https://your-api-url.com/api/webhook", { productId }).then(() => {
      alert("Notifications sent!");
    });
  };

  return (
    <div>
      <h2>Back-in-Stock Notifications</h2>
      {notifications.map((item) => (
        <div key={item.productId}>
          <p>{item.productTitle} - {item.email}</p>
          <button onClick={() => notifyUsers(item.productId)}>Notify</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
