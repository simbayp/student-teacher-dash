import React, { useContext, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HamburgerMenu from './HamburgerMenu';
import StudentContext from '../../contexts/StudentContext';

const Navbar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { studentName } = useContext(StudentContext);

  const changeHandler = (event, value) => {
    if (!value) {
      setValue(0);
      navigate('/');
    } else {
      setValue(0);
    }
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <AppBar sx={{ background: '#352f44', position: 'sticky' }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => setValue(0)}
            >
              <AutoStoriesIcon fontSize="large" />
              <Typography marginLeft={2}>Student Teacher Dashboard</Typography>
            </Box>
          </Link>
          {isMatch ? (
            <>
              <HamburgerMenu />
            </>
          ) : (
            <>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={changeHandler}
                indicatorColor="primary"
                sx={{ marginLeft: 'auto' }}
              >
                <Tab label="students" />
              </Tabs>
              <Stack
                direction="row"
                sx={{ marginLeft: 'auto', alignItems: 'center', gap: '0.5rem' }}
              >
                <Avatar
                  src="https://picsum.photos/50/50"
                  sx={{ height: '2rem', width: '2rem' }}
                />
                <Typography>{studentName}</Typography>
              </Stack>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
