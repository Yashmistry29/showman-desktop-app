import React from 'react'
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import '../styles/homepage.scss'

function Homepage() {
  const history = useNavigate()

  setTimeout(() => {
    history('/dashboard')
  }, 10000);

  return (
    <div className='center'>
      <CircularProgress />
      <h1>Loading....</h1>

    </div>
  )
}

export default Homepage