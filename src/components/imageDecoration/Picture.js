import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import React from "react";
import "../imageDecoration/Picture.css";

function Picture() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image={require("../../assests/logo/fodd1.webp")}
        alt="Dish"
      />

      <CardContent id="content-background">
        <Typography variant="body2" color="text.secondary" id="content">
          Business that prepares and serves food and drinks to customers. Meals
          are generally served and eaten on the premises, but many restaurants
          also offer take-out and food delivery services.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Picture;
