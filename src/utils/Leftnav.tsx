import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;
const modules = [
  {
    route: "demo-graphics",
    name: "Patient Demographics"
  },
  {
    route: "medication-allergies",
    name: "Patient Medication and Allergies"
  },
  {
    route: "immunization-details",
    name: "Patient Immunization details"
  },
  {
    route: "schedule-appointment",
    name: "Schedule Appointement"
  },
  {
    route: "vitals",
    name: "Patient Vitals"
  },
]
const personalModules = [
  {
    route: "billing",
    name: "Billing"
  },
  {
    route: "proile",
    name: "Profile"
  }
]

export default function PermanentDrawerLeft() {
  const navigate = useNavigate()
  const navRouting = (module: { route: string, name: string }) => {
    navigate(module.route)
  }
  return (
    <Box sx={{ display: 'flex', minHeight: "calc(100vh - 128px)",width:"fit-content", }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            position: "relative",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          {modules.map((ele, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navRouting(ele)}>
                <ListItemText primary={ele.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {personalModules.map((ele, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navRouting(ele)}>
                <ListItemText primary={ele.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3,border:"2px solid red" }}
      >
        <Toolbar />


      </Box> */}
    </Box>
  );
}
