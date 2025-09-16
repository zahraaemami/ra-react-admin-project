import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function StatusPage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          صفحه وضعیت سیستم
        </Typography>
        <Typography>
          ✅ سرور فعال است
        </Typography>
        <Typography>
          📊 دیتابیس آنلاین
        </Typography>
        <Typography>
          🔒 سرویس احراز هویت در حال اجرا
        </Typography>
      </CardContent>
    </Card>
  );
}
