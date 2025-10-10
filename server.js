const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MongoDB Setup =====
const MONGO_URI = "mongodb+srv://finderuser:sagarpurhack@cluster0.ifguvgs.mongodb.net/finderDB?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("✅ Connected to MongoDB"))
  .catch(err=>console.error("❌ MongoDB connection error:", err));

const submissionSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  features: String,
  places: String,
  gift: String,
  crackers: String,
  vibes: String,
  safety: String,
  phone: String,
  email: String,
  insta: String,
  photoName: String
});


const Submission = mongoose.model("Submission", submissionSchema);

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve static files

// ===== Serve finder.html at root =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "finder.html"));
});

// ===== Multer Setup =====
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===== POST /submit =====
app.post("/submit", upload.single("photo"), async (req, res) => {
  try {
  const { features, places, gift, crackers, vibes, safety, phone, email, insta } = req.body;
const photoName = req.file ? req.file.originalname : null;

const submission = new Submission({
  features,
  places,
  gift,
  crackers,
  vibes,
  safety,
  phone,
  email,
  insta,
  photoName
});

    await submission.save();

    res.json({ success: true, message: "Form submitted successfully and saved in MongoDB!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===== Start Server =====
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





