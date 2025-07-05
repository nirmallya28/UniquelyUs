import { Stack, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import TopPosts from "./TopPosts";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      {/* Smart Features Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🌟 Smart Features
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mb: 1 }}
            onClick={() => navigate("/story-sharing")}
          >
            ✍️ Creative Story Sharing
          </Button>

          <Button
          variant="contained"
            color="secondary"
            sx={{ mb: 1 }}
            onClick={() => navigate("/chat-friend-matching")}
          >
            🤖 Smart Chat & Friend Matching
          </Button>

          <Button
           variant="contained"
            color="secondary"
            sx={{ mb: 1 }}
            onClick={() => navigate("/comfortable-design")}
          >
            🎨 Comfortable & Simple Design
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mb: 1 }}
            onClick={() => navigate("/personalized-learning")}
          >
            📚 Learns & Adapts to Each Child
          </Button>

         
          <Button
            variant="contained"
            color="secondary"
            sx={{ mb: 1 }}
            onClick={() => navigate("/fun-social-games")}
          >
            🎲 Fun Games That Teach Social Skills
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/daily-routine-helper")}
          >
            📅 Daily Routine Helper
          </Button>
        </CardContent>
      </Card>

      <TopPosts />
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
