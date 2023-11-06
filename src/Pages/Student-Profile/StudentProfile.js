import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Box,
  styled,
  Stack,
  Typography,
  CircularProgress,
  Tooltip,
  Fab,
  Card,
  CardContent,
  Avatar,
  Input,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LineChart from '../../components/Charts/LineChart';
import DonutChart from '../../components/Charts/DonutChart';
import StudentContext from '../../context/StudentContext';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StudentProfile = () => {
  const [studentProfileData, setStudentProfileData] = useState([]);
  const { setStudentName, isEdit, setIsEdit, editMarks, setEditMarks } =
    useContext(StudentContext);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { id } = useParams();
  const subjects = [
    'Physics',
    'English',
    'Maths',
    'Science',
    'Chemistry',
    'Computer',
  ];

  const updateMarksHandler = async () => {
    const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/students/${id}`;
    const editedMarks = { marks: editMarks };
    setUpdateLoading(true);

    try {
      await axios.put(url, editedMarks);
      getProfile();
      setUpdateLoading(false);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setEditMarks({ ...editMarks, [e.target.name]: e.target.value });
  };

  const editHandler = () => {
    if (isEdit) {
      setIsEdit(false);
      return;
    }
    setIsEdit(true);
  };

  const getProfile = async () => {
    const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/students/${id}`;

    try {
      const response = await axios.get(url);
      setStudentProfileData(response.data);
      setStudentName(response.data.name);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Container>
        {loading ? (
          <CircularProgress sx={{ color: '#000' }} />
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{ color: '#495057', fontWeight: 'bold' }}
              mt={3}
              mb={3}
            >
              {studentProfileData.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} my={5}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={8}>
                  <Item>
                    <LineChart
                      marks={Object.values(studentProfileData.marks).map(
                        (val) => val
                      )}
                    />
                  </Item>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Item>
                    <DonutChart
                      marks={Object.values(studentProfileData.marks).map(
                        (val) => val
                      )}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Box>
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
              {Object.values(studentProfileData.marks).map((marks, index) => (
                <Card
                  sx={{ maxWidth: 345, borderLeft: '3px solid #9c27b0' }}
                  key={index}
                >
                  <CardContent>
                    <Stack
                      sx={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <Avatar variant="rounded" sx={{ bgcolor: '#9c27b0' }}>
                        <DataUsageIcon />
                      </Avatar>
                      <Box textAlign="center">
                        <Typography fontWeight="bold" color="#495057">
                          {subjects[index]}
                        </Typography>
                        <Typography
                          component={'div'}
                          sx={{ color: '#495057', fontWeight: 'bold' }}
                        >
                          {isEdit ? (
                            <Input
                              placeholder={'' + marks}
                              type="number"
                              onChange={changeHandler}
                              name={subjects[index]}
                              value={+editMarks[subjects[index]]}
                            />
                          ) : (
                            marks
                          )}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </>
        )}
      </Container>
      <Tooltip
        arrow
        title="Edit Student marks"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        {isEdit ? (
          updateLoading ? (
            <CircularProgress sx={{ color: '#000' }} />
          ) : (
            <Fab color="success" aria-label="add" onClick={updateMarksHandler}>
              <CheckIcon />
            </Fab>
          )
        ) : (
          <Fab color="secondary" aria-label="add" onClick={editHandler}>
            <ModeEditIcon />
          </Fab>
        )}
      </Tooltip>
    </>
  );
};

export default StudentProfile;
