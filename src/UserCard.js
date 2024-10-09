import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name} {user.surname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Группа: {user.group}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
