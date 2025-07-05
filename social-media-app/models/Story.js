const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  drawing: { type: String, required: false }, // base64 image
  audio: { type: String, required: false },   // base64 audio or public URL
  text: { type: String, required: false },
  isPosted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Story", StorySchema);