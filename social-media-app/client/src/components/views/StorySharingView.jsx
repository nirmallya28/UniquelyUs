import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  Stack,
  Card,
  CardContent,
  Slider,
  InputLabel,
} from "@mui/material";

const StorySharingView = () => {
  const canvasRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [story, setStory] = useState("");
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const userId = "6651117ef45215e4f4bd014b"; // Replace this dynamically if needed

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    canvas.onmousemove = (ev) => {
      ctx.lineTo(ev.offsetX, ev.offsetY);
      ctx.stroke();
    };

    canvas.onmouseup = () => {
      canvas.onmousemove = null;
    };
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("❌ Unable to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const resetFields = () => {
    setStory("");
    setAudioURL(null);
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleSubmit = async () => {
    try {
      const drawingData = canvasRef.current.toDataURL(); // base64
      const payload = {
        userId,
        drawing: drawingData,
        audio: audioURL,
        text: story,
        isPosted: false
      };

      const res = await fetch("http://localhost:4000/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to submit");

      alert("✅ Story submitted!");
      resetFields();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving story");
    }
  };

  const handlePostSubmit = async () => {
    try {
      const drawingData = canvasRef.current.toDataURL(); // base64
      const payload = {
        userId,
        drawing: drawingData,
        audio: audioURL,
        text: story,
        isPosted: true
      };

      const res = await fetch("http://localhost:4000/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to post");

      alert("✅ Story posted and submitted!");
      resetFields();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving story");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        ✍️ Creative Story Sharing
      </Typography>

      {/* Drawing Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🎨 Draw Your Story</Typography>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Brush Color:</InputLabel>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
            />
            <InputLabel>Brush Size:</InputLabel>
            <Slider
              value={brushSize}
              min={1}
              max={20}
              step={1}
              onChange={(e, newVal) => setBrushSize(newVal)}
              sx={{ width: 150 }}
            />
          </Stack>

          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            style={{ border: "2px solid #ccc", marginTop: "10px" }}
            onMouseDown={handleCanvasMouseDown}
          />
        </CardContent>
      </Card>

      {/* Audio Recorder */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🎤 Record Your Voice</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {!recording ? (
              <Button variant="contained" onClick={startRecording}>
                Start Recording
              </Button>
            ) : (
              <Button variant="contained" color="error" onClick={stopRecording}>
                Stop Recording
              </Button>
            )}
            {audioURL && <audio controls src={audioURL} />}
          </Stack>
        </CardContent>
      </Card>

      {/* Text Story */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">📝 Write Your Story</Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            placeholder="Once upon a time..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="success" fullWidth onClick={handlePostSubmit}>
          Post & Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default StorySharingView;