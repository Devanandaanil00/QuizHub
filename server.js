const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Safer MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("DB Error:", err));

// Schema
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    answer: { type: String, required: true }
});

// Model
const Question = mongoose.model("Question", questionSchema);

// Routes

app.get("/", (req, res) => {
    res.send("QuizHub Backend Running");
});

// ✅ Get all questions
app.get("/api/questions", async (req, res) => {
    try {
        const data = await Question.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
});

// ✅ Add this (VERY IMPORTANT for testing)
app.post("/api/questions", async (req, res) => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.json({ message: "Question added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding question" });
    }
});

// ✅ Fix PORT issue (fallback)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});