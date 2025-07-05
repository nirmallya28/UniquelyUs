import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Slider,
  Stack,
  TextField,
} from "@mui/material";

const FunSocialGamesView = () => {
  // Game 1: Sharing Game
  const [sharedCount, setSharedCount] = useState(0);
  const [sharingFeedback, setSharingFeedback] = useState("");

  const handleShareToy = () => {
    setSharedCount(sharedCount + 1);
    setSharingFeedback("✅ Great job sharing!");
    setTimeout(() => setSharingFeedback(""), 1500);
  };

  // Game 2: Turn Taking Game
  const [turn, setTurn] = useState("You");
  const [turnFeedback, setTurnFeedback] = useState("");

  const handleTakeTurn = () => {
    if (turn === "You") {
      setTurn("Computer");
      setTurnFeedback("🕒 Waiting for computer...");
      setTimeout(() => {
        setTurn("You");
        setTurnFeedback("✅ Your turn again!");
      }, 1500);
    }
  };

  // Game 3: Emotion Matcher Game
  const emotionPairs = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😨", label: "Scared" },
  ];
  const getRandomEmotion = () =>
    emotionPairs[Math.floor(Math.random() * emotionPairs.length)];

  const [currentEmotion, setCurrentEmotion] = useState(getRandomEmotion());
  const [emotionFeedback, setEmotionFeedback] = useState("");

  const handleEmotionGuess = (guessLabel) => {
    if (guessLabel === currentEmotion.label) {
      setEmotionFeedback("✅ Correct!");
    } else {
      setEmotionFeedback(`❌ Oops! That was "${currentEmotion.label}".`);
    }

    setTimeout(() => {
      setCurrentEmotion(getRandomEmotion());
      setEmotionFeedback("");
    }, 2000);
  };

  // Game 4: Facial Expression Imitation Game
  const expressions = ["😊", "😢", "😡", "😮"];
  const [currentExpression, setCurrentExpression] = useState("😊");

  const getRandomExpression = () =>
    expressions[Math.floor(Math.random() * expressions.length)];

  const handleNewExpression = () => {
    const next = getRandomExpression();
    setCurrentExpression(next);
  };

  // Game 5: Volume Control Game
  const [volume, setVolume] = useState(5);
  const [volumeFeedback, setVolumeFeedback] = useState("");

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (newValue >= 8) {
      setVolumeFeedback("📢 Too loud!");
    } else if (newValue <= 2) {
      setVolumeFeedback("🤫 Too soft!");
    } else {
      setVolumeFeedback("✅ Just right!");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🎮 Fun Games to Improve Social Skills
      </Typography>

      {/* Sharing Game */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🤝 Sharing Game</Typography>
          <Typography gutterBottom>Click the toy to share it!</Typography>
          <Button variant="contained" onClick={handleShareToy}>
            🎁 Share Toy
          </Button>
          <Typography mt={2}>Toys Shared: {sharedCount}</Typography>
          {sharingFeedback && (
            <Typography color="success.main">{sharingFeedback}</Typography>
          )}
        </CardContent>
      </Card>

      {/* Turn Taking Game */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🔄 Turn Taking Game</Typography>
          <Typography>Current Turn: {turn}</Typography>
          <Button
            variant="contained"
            onClick={handleTakeTurn}
            disabled={turn !== "You"}
            sx={{ mt: 2 }}
          >
            🎲 Take Turn
          </Button>
          {turnFeedback && (
            <Typography mt={2} color="primary.main">
              {turnFeedback}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Emotion Matcher */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🧠 Emotion Matcher</Typography>
          <Typography fontSize={24} sx={{ my: 2 }}>
            What emotion is this? {currentEmotion.emoji}
          </Typography>
          <Grid container spacing={2}>
            {emotionPairs.map((item) => (
              <Grid item xs={6} sm={3} key={item.label}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleEmotionGuess(item.label)}
                >
                  {item.label}
                </Button>
              </Grid>
            ))}
          </Grid>
          {emotionFeedback && (
            <Typography mt={2} color={emotionFeedback.includes("Correct") ? "success.main" : "error"}>
              {emotionFeedback}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Facial Expression Game */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🪞 Expression Imitation</Typography>
          <Typography variant="body1" sx={{ fontSize: 32 }}>
            Try to copy this face: {currentExpression}
          </Typography>
          <Button variant="outlined" onClick={handleNewExpression} sx={{ mt: 2 }}>
            🔁 New Expression
          </Button>
        </CardContent>
      </Card>

      {/* Volume Control Game */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">📣 Volume Control Game</Typography>
          <Typography>Adjust your speaking volume!</Typography>
          <Stack spacing={2} direction="row" alignItems="center" sx={{ mt: 2 }}>
            <Typography>🤫</Typography>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={10}
              step={1}
              sx={{ width: 200 }}
            />
            <Typography>📢</Typography>
          </Stack>
          {volumeFeedback && (
            <Typography mt={1} color="primary.main">
              {volumeFeedback}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default FunSocialGamesView;