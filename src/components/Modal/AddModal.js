import React, { useState } from 'react';
import {
  Box,
  Fab,
  Modal,
  Tooltip,
  TextField,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

const AddModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({
    id: '',
    name: '',
    class: '',
    teacher: '',
    attendence: '',
    marks: {
      Hindi: 0,
      English: 0,
      Maths: 0,
      Science: 0,
      Social: 0,
      Computer: 0,
    },
    image: '',
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const addStudentHandler = async () => {
    const url = 'https://6541fd90f0b8287df1ff4458.mockapi.io/students';

    setLoading(true);

    try {
      await axios.post(url, studentData);
      await axios.get(url);
      setLoading(false);
      setOpen(false);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip
        title="Add Student"
        onClick={(e) => setOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center', marginBottom: 3 }}
          >
            Add Student
          </Typography>
          <Stack
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              gap: 2,
            }}
          >
            <TextField
              type="text"
              name="id"
              size="small"
              label="Student id"
              variant="outlined"
              value={studentData.id}
              onChange={handleChange}
              required
            />
            <TextField
              type="text"
              name="name"
              size="small"
              label="Name"
              variant="outlined"
              value={studentData.name}
              onChange={handleChange}
              required
            />
            <TextField
              type="text"
              name="class"
              size="small"
              label="class"
              variant="outlined"
              value={studentData.class}
              onChange={handleChange}
              required
            />
            <TextField
              type="text"
              name="teacher"
              size="small"
              label="Assign Teacher"
              variant="outlined"
              value={studentData.teacher}
              onChange={handleChange}
              required
            />
            <TextField
              type="text"
              name="attendance"
              size="small"
              label="attendance"
              variant="outlined"
              value={studentData.attendance}
              onChange={handleChange}
              required
            />
            <TextField
              type="text"
              name="image"
              size="small"
              label="Image url"
              variant="outlined"
              value={studentData.image}
              onChange={handleChange}
              required
            />
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button variant="contained" onClick={addStudentHandler}>
                Add
              </Button>
            )}
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AddModal;
