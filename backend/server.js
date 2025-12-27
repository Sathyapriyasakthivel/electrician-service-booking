const express = require("express");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use("/api", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Electrician Booking API running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
