const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow FCC testing

app.get("/", (req, res) => {
  res.send("Timestamp Microservice. Try /api/2015-12-25 or /api/1451001600000");
});

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date;

  // If no date is passed, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if it's a Unix timestamp
    if (!isNaN(dateParam)) {
      // Convert to number
      dateParam = parseInt(dateParam);

      // Convert to milliseconds if 10-digit timestamp
      if (dateParam.toString().length === 10) {
        dateParam *= 1000;
      }
    }
    date = new Date(dateParam);
  }

  // If the date is invalid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return timestamp in both Unix and UTC formats
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
