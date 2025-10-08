import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true });

const submissionSchema = new mongoose.Schema({
  timestamp: Date,
  features: String,
  places: String,
  phone: String,
  email: String,
  insta: String
});

const Submission = mongoose.model('Submission', submissionSchema);

app.post('/submit', async (req, res) => {
  try {
    const data = req.body;
    data.timestamp = new Date();
    const submission = new Submission(data);
    await submission.save();
    res.json({ message: 'Submission saved to database!' });
  } catch(err) {
    res.status(500).json({ message: 'Error saving submission', error: err });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));




