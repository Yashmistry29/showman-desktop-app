import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Avatar, Divider, List, ListItem, ListItemIcon, } from '@mui/material';
import { ListItemButton } from '../FormElements/ListItemButton';
import { Drawer } from '../FormElements/Drawer';
import StraightenIcon from '@mui/icons-material/Straighten';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';
import { toast, ToastContainer } from 'react-toastify';
import Icon from '../../images/icon1.png';
import './Menu.scss'

function Menu({ item }) {

  const navigate = useNavigate();

  const [select, setSelect] = useState({
    dashboard: false,
    measurement: false,
    setting: false,
    payment: false,
  });

  const handleDashboard = () => {
    setSelect({
      dashboard: true,
      measurement: false,
      setting: false,
    });
    if (item !== 'dashboard') {
      navigate("/dashboard", { replace: true })
    }
  }

  const handleMeasurement = () => {
    setSelect({
      dashboard: false,
      measurement: true,
      setting: false,
    });
    if (item !== 'measurement') {
      navigate("/measurement", { replace: true })
    }
  }

  const handleSetting = () => {
    setSelect({
      dashboard: false,
      measurement: false,
      setting: true,
    });
    if (item !== 'setting') {
      navigate("/setting", { replace: true })
    }
  }

  const handleLogout = () => {
    sendRequest('/user/signout', 'POST')
      .then((resp) => {
        // console.log(resp);
        if (resp.success) {
          toast.success(resp.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          localStorage.removeItem('Authenticated')
          navigate("/login", { replace: true });
        }
      })
  }

  useEffect(() => {
    setSelect({ ...select, [item]: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(item)

  return (
    <Drawer variant="permanent" className='Menu'>
      <ToastContainer />
      <List>
        <ListItem disablePadding sx={{ display: 'block' }} >
          <ListItemButton className="logo mb3">
            <Avatar src={Icon} alt="Logo" variant='square' sx={{ width: 36, height: 36 }} />
          </ListItemButton>
          <Divider light />
          <ListItemButton disabled></ListItemButton>
          <ListItemButton selected={select.dashboard} onClick={handleDashboard}>
            <ListItemIcon>
              <DashboardIcon fontSize='large' className={select.dashboard ? 'black' : 'white'} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton selected={select.measurement} onClick={handleMeasurement} >
            <ListItemIcon>
              <StraightenIcon fontSize='large' className={select.measurement ? 'black' : 'white'} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton selected={select.setting} onClick={handleSetting}>
            <ListItemIcon>
              <SettingsIcon fontSize='large' className={select.setting ? 'black' : 'white'} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton disabled selected={select.payment}>
            <ListItemIcon>
              <PaymentIcon fontSize='large' className={select.payment ? 'black' : 'white'} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton disabled className='mt3 mb3'></ListItemButton>
          <ListItemButton disabled className='mt3 mb3'></ListItemButton>
          <ListItemButton disabled className='mt3 mb3'></ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='large' className="white" />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Menu;
