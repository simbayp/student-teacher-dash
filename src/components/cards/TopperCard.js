import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const TopperCard = () => {
  return (
    <Card sx={{ maxWidth: 345, borderLeft: '3px solid green' }}>
      <CardContent>
        <Stack
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Avatar variant="rounded" sx={{ bgcolor: 'green' }}>
            <StarIcon />
          </Avatar>
          <Box textAlign="center">
            <Typography fontWeight="bold" color="#495057">
              Academic Topper
            </Typography>
            <Typography
              sx={{ color: '#495057', fontWeight: 'bold', fontSize: 'small' }}
            >
              {'Mr. Jack (97.6%)'}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TopperCard;
