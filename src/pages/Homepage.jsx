import React from 'react'
import { CircularProgress } from '@mui/material';
import mainlogo from "../images/SM_Logo.png";
import '../styles/homepage.scss'
const electron = window.require("electron");

function Homepage() {

  React.useEffect(() => {
    const timer = setTimeout(() => {
      electron.ipcRenderer.send('Timeout', true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className="flex flex-column w-80 center tc pa3 mt3">
      <img src={mainlogo} alt="logo" className="w-100" />
      <p
        className='tc title-font'
        style={{ color: "rgb(124, 23, 23)", letterSpacing: "2px" }}
      >Showman <span className="black">Tailors</span></p>
      <CircularProgress className='center' />
    </div>
  )
}

export default Homepage