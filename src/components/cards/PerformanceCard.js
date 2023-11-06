import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const PerformanceCard = () => {
  return (
    <Card sx={{ maxWidth: 345, borderLeft: "3px solid #9c27b0" }}>
      <CardContent>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Avatar variant="rounded" sx={{ bgcolor: "#9c27b0" }}>
            <ShowChartIcon />
          </Avatar>
          <Box textAlign="center">
            <Typography fontWeight="bold" color="#495057">
              Overall Performance
            </Typography>
            <Typography sx={{ color: "#495057", fontWeight: "bold" }}>
              95.5%
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
