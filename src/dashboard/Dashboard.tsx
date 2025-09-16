import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          داشبورد مدیریت
        </Typography>
        <Typography variant="body1">
          به پنل مدیریت خوش آمدید 🌹
        </Typography>
      </CardContent>
    </Card>
  );
}
