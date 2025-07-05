const express = require("express");
const router = express.Router();
const Story = require("../models/Story");

// POST: Submit or Post a Story
router.post("/", async (req, res) => {
  try {
    const { userId, drawing, audio, text, isPosted } = req.body;

    const newStory = new Story({
      userId,
      drawing,
      audio,
      text,
      isPosted
    });

    const saved = await newStory.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error saving story:", error);
    res.status(500).json({ message: "Error saving story", error });
  }
});

module.exports = router;