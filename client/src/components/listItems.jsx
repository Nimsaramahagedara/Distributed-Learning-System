import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import { Book, LocalBar, Person, Store } from '@material-ui/icons';
import { Liquor } from '@mui/icons-material';

export const adminListItems = (
  <React.Fragment>
    <Link to={'/admin/home'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const instructorListItems = (
  <React.Fragment>
  <Link to={'/instruct'}>
    <ListItemButton>
      <ListItemIcon>
        <Book />
      </ListItemIcon>
      <ListItemText primary="My Courses" />
    </ListItemButton>
  </Link>
  <Link to={'./profile'}>
    <ListItemButton>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);

export const learnerListItems = (
  <React.Fragment>
  <Link to={'/learner'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
  </Link>
  <Link to={'./search'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItemButton>
  </Link>
  <Link to={'./my-learning'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="My Learning" />
    </ListItemButton>
  </Link>
  <Link to={'./profile'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </Link>
  <Link to={'./transactions'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItemButton>
  </Link>
  </React.Fragment>
);