import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import StudentTable from '../../components/table/StudentTable';
import AttendanceCard from '../../components/cards/AttendanceCard';
import PerformanceCard from '../../components/cards/PerformanceCard';
import TopperCard from '../../components/cards/TopperCard';
import AddModal from '../../components/modal/AddModal';

const Dashboard = () => {
  return (
    <>
      <Container
        sx={{
          marginTop: '3rem',
          marginBottom: '3rem',
        }}
      >
        <Typography variant="h4" mb={3} color="#495057">
          Welcome Admin,
        </Typography>
        <Stack
          sx={{
            gap: 2,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            marginTop: { sm: '3rem' },
          }}
        >
          <AttendanceCard />
          <PerformanceCard />
          <TopperCard />
        </Stack>
        <Typography variant="h5" mb={3} color="#495057">
          Students Record
        </Typography>
        <StudentTable />
      </Container>
      <AddModal />
    </>
  );
};

export default Dashboard;
