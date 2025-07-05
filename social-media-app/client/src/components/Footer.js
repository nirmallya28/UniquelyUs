import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card sx={{ padding: 2 }}>
        <Typography variant="subtitle1">
          Welcome to a new VR World! ⭐
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
