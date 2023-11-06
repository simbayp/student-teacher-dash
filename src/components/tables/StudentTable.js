import {
  styled,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Avatar,
  Typography,
  Stack,
  Box,
  IconButton,
  CircularProgress,
  Input,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentContext from '../../contexts/StudentContext';

const StyledTableCell = styled(TableCell)({
  fontSize: 16,
  letterSpacing: 0.5,
  fontWeight: 'bold',
  color: '#adb5bd',
});

const StudentTable = () => {
  const [loading, setLoading] = useState(true);
  const [isTableEdit, setIsTableEdit] = useState(false);
  const [students, setStudents] = useState([]);
  const { tableData, setTableData } = useContext(StudentContext);
  const [id, setId] = useState(-1);
  const navigate = useNavigate();

  const profileHandler = (id) => {
    navigate(`/students/${id}`);
  };

  const studentsUpdateHandler = (e) => {
    setTableData({ ...tableData, [e.target.name]: e.target.value });
  };

  const editHandler = (id) => {
    setIsTableEdit(true);
    setId(id);
  };

  const updateStudentData = async (id) => {
    const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/students/${id}`;
    let newData = {};

    setLoading(true);

    for (const [key, value] of Object.entries(tableData)) {
      if (value === '' || value === 0) continue;
      newData[key] = value;
    }

    try {
      await axios.put(url, newData);
      getStudents();
      setTableData({ name: '', class: '', teacher: '', attendance: '' });
      setIsTableEdit(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudents = async () => {
    const url = 'https://6541fd90f0b8287df1ff4458.mockapi.io/students';

    try {
      await axios.get(url).then(({ data }) => setStudents(data));
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteDataHandler = async (id) => {
    const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/students/${id}`;

    try {
      await axios.delete(url);
      getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress sx={{ color: '#000' }} />
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: '#352f44' }}>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Class</StyledTableCell>
                <StyledTableCell>Teacher Assigned</StyledTableCell>
                <StyledTableCell>Attendance</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Stack
                      direction="row"
                      sx={{ alignItems: 'center', gap: '1rem' }}
                    >
                      <Avatar
                        src={student.image}
                        sx={{ height: '2rem', width: '2rem' }}
                      />
                      <Typography
                        sx={{
                          letterSpacing: 0.5,
                          fontWeight: 'bold',
                          color: '#495057',
                          fontSize: 16,
                        }}
                        component="div"
                      >
                        {isTableEdit && student.id === id ? (
                          <Input
                            placeholder={student.name}
                            name="name"
                            value={tableData['name']}
                            onChange={studentsUpdateHandler}
                          />
                        ) : (
                          student.name
                        )}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography
                      component="div"
                      sx={{
                        letterSpacing: 0.5,
                        fontWeight: 'bold',
                        color: '#495057',
                        fontSize: 16,
                      }}
                    >
                      {isTableEdit && student.id === id ? (
                        <Input
                          placeholder="class"
                          name="class"
                          value={tableData.class}
                          onChange={studentsUpdateHandler}
                        />
                      ) : (
                        student.class
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {isTableEdit && student.id === id ? (
                      <Input
                        placeholder={student.teacher}
                        name="teacher"
                        value={tableData.teacher}
                        onChange={studentsUpdateHandler}
                      />
                    ) : (
                      <Typography
                        component="div"
                        sx={{
                          fontSize: 16,
                          letterSpacing: 0.5,
                          fontWeight: 'bold',
                          color: '#495057',
                        }}
                      >
                        {student.teacher}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {isTableEdit && student.id === id ? (
                      <Input
                        type="text"
                        placeholder={'' + student.attendance}
                        name="attendence"
                        value={tableData.attendance}
                        onChange={studentsUpdateHandler}
                      />
                    ) : (
                      <Box
                        sx={{ position: 'relative', display: 'inline-flex' }}
                      >
                        <CircularProgress
                          variant="determinate"
                          value={+student.attendance}
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                            fontWeight={800}
                          >
                            {student.attendance}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </TableCell>
                  {isTableEdit ? (
                    <TableCell>
                      <IconButton
                        sx={{ color: '#4615b2' }}
                        aria-label="add an alarm"
                        onClick={() => updateStudentData(student.id)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: '#4615b2' }}
                        aria-label="add an alarm"
                        onClick={() => setIsTableEdit(false)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <IconButton
                        sx={{ color: '#4615b2' }}
                        aria-label="add an alarm"
                        onClick={() => profileHandler(student.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: '#4615b2' }}
                        aria-label="add an alarm"
                        onClick={() => editHandler(student.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: '#4615b2' }}
                        aria-label="add an alarm"
                        onClick={() => deleteDataHandler(student.id)}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default StudentTable;
