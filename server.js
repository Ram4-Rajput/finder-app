const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // allows finder.html to be served directly

// Serve finder.html when user visits the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "finder.html"));
});

// POST endpoint to receive data
app.post("/submit", (req, res) => {
  const submission = req.body;
  const dir = path.join(__dirname, "submission");

  // Ensure 'submission' folder exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Save JSON file inside 'submission'
  const filePath = path.join(dir, `submission_${Date.now()}.json`);
  fs.writeFileSync(filePath, JSON.stringify(submission, null, 2));

  console.log("✅ Submission saved:", filePath);
  res.json({ message: "Submission received successfully!" });
});

// Render’s required port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

