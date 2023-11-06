import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    if (e.target.innerText === "STUDENTS") {
      setOpenDrawer(false);
      navigate("/");
    } else if (e.target.innerText === "TEACHERS") {
      setOpenDrawer(false);
      navigate("/teachers");
    }
  };

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                  onClick={changeHandler}
                >
                  <FaceIcon />
                  STUDENTS
                </Box>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto", color: "white" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HamburgerMenu;
