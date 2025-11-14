const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const app = express();
dotenv.config();

// ----------------------
// CORS FIX
// ----------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://autism-platform-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from tools like Postman with no origin
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("❌ CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json({ limit: "20mb" })); // Accept large base64 drawings

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("✅ MongoDB connected")
);

// ----------------------
// Routes
// ----------------------
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");
const storyRoutes = require("./routes/story");

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);
app.use("/api/stories", storyRoutes);

// ----------------------
// Socket.IO Setup
// ----------------------
const httpServer = require("http").createServer(app);
const { authSocket, socketServer } = require("./socketServer");

const io = require("socket.io")(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://autism-platform-frontend.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

// ----------------------
// Production Setup
// ----------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  
  // Uncomment this if you want frontend routing support
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "client/build", "index.html"));
  // });
}

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
