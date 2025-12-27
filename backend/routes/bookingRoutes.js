const express = require("express");
const router = express.Router();
const db = require("../db");

// POST: Save booking
router.post("/bookings", (req, res) => {
  const { service, sub_service, name, email, phone, description } = req.body;

  if (!service || !sub_service || !name || !phone || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO bookings (service, sub_service, name, email, phone, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [service, sub_service, name, email, phone, description],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Booking successful" });
    }
  );
});


// GET: Active bookings only
router.get("/bookings", (req, res) => {
  db.query(
    "SELECT * FROM bookings WHERE status = 'ACTIVE' ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    }
  );
});

// GET: Completed bookings (History)
router.get("/bookings/history", (req, res) => {
  db.query(
    "SELECT * FROM bookings WHERE status = 'COMPLETED' ORDER BY completed_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    }
  );
});


// PUT: Mark booking as completed
router.put("/bookings/:id/complete", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE bookings
    SET status = 'COMPLETED', completed_at = NOW()
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Booking marked as completed" });
  });
});


module.exports = router;
