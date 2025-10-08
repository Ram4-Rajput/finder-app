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
const fs = require('fs');
const path = require('path');

app.post('/submit', upload.single('photo'), (req, res) => {
  const data = req.body;
  if(req.file){
    const photoPath = path.join(__dirname, 'submissions', req.file.originalname);
    fs.writeFileSync(photoPath, req.file.buffer);
  }

  const jsonPath = path.join(__dirname, 'submissions', `${Date.now()}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

  res.json({ message: 'Submission stored successfully ✅' });
});



