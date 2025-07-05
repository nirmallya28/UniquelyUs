import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright © 2025 Nirmallyadeb Ray{" "}
      <Link to="/" color="inherit">
      UniquelyUs
      </Link>
    </Typography>
  );
};

export default Copyright;
