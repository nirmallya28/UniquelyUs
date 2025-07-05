import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SmartFeatures = () => {
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 2 }}>
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
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => navigate("/chat-friend-matching")}
        >
          🤖 Smart Chat & Friend Matching
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => navigate("/comfortable-design")}
        >
          🎨 Comfortable & Simple Design
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => navigate("/personalized-learning")}
        >
          📚 Learns & Adapts to Each Child
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => navigate("/fun-social-games")}
        >
          🎲 Fun Games That Teach Social Skills
        </Button>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => navigate("/daily-routine-helper")}
        >
          📅 Daily Routine Helper
        </Button>
      </CardContent>
    </Card>
  );
};

export default SmartFeatures;
