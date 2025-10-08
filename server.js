const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MongoDB Setup =====
const MONGO_URI = "mongodb+srv://finderuser:sagarpurbusstand@cluster0.ifguvgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // replace with your URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("✅ Connected to MongoDB"))
  .catch(err=>console.error("❌ MongoDB connection error:", err));

const submissionSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  features: String,
  places: String,
  phone: String,
  email: String,
  insta: String,
  photoName: String, // optional filename
});

const Submission = mongoose.model("Submission", submissionSchema);

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Multer Setup for file uploads =====
const storage = multer.memoryStorage(); // keep file in memory for now
const upload = multer({ storage });

// ===== Serve finder.html =====
app.use(express.static(__dirname));

// ===== POST /submit =====
app.post("/submit", upload.single("photo"), async (req, res) => {
  try {
    const { features, places, phone, email, insta } = req.body;
    const photoName = req.file ? req.file.originalname : null;

    // Save to MongoDB
    const submission = new Submission({ features, places, phone, email, insta, photoName });
    await submission.save();

    // Optionally save photo locally (ephemeral on Render)
    if(req.file){
      // You can skip saving to server if only MongoDB is used
      // Or save to S3/other storage if needed
    }

    res.json({ success: true, message: "Form submitted successfully and saved in DB!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== Start Server =====
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





