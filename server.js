const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS, JS, images, etc.)
app.use(express.static(__dirname));

// Serve finder.html on the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "finder.html"));
});

// Endpoint for form submission (example)
app.post("/submit", (req, res) => {
  console.log("Form data received:", req.body);
  res.json({ message: "Form submission successful!" });
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


