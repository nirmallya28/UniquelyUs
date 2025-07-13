const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');


const path = require("path");

const app = express();
dotenv.config();

// Middleware
app.use(express.json({ limit: "20mb" })); // Accept large base64 drawings
app.use(cors({
  origin: 'https://autism-platform-frontend.vercel.app',
  credentials: true,
}));


// MongoDB Connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("✅ MongoDB connected")
);

// Routes
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");
const storyRoutes = require("./routes/story"); // ✅ Story route added

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);
app.use("/api/stories", storyRoutes); // ✅ Mount story routes

// Socket.IO setup
const httpServer = require("http").createServer(app);
const { authSocket, socketServer } = require("./socketServer");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://post-it-heroku.herokuapp.com"],
  },
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

// Production static file serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Server Listening
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
