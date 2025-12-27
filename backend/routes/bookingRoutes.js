const express = require("express");
const router = express.Router();
const db = require("../db");

// POST: Save booking
router.post("/bookings", (req, res) => {
  const { service, subService, name, email, phone, description } = req.body;

  if (!service || !subService || !name || !phone || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO bookings (service, sub_service, name, email, phone, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [service, subService, name, email, phone, description],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Booking successful" });
    }
  );
});

// GET: Fetch bookings (Admin)
router.get("/bookings", (req, res) => {
  db.query(
    "SELECT * FROM bookings ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    }
  );
});

module.exports = router;
