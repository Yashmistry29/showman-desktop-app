import React, { useState, useEffect } from 'react'
import { Avatar, Grid } from '@mui/material'
import { CreateCustomer } from '../utils/Data/InitialValues';
import { ValidateCustomer } from '../utils/Validation/FormValidation';
import { toast, ToastContainer } from 'react-toastify';
import { CssTextField as TextField } from "../components/FormElements/TextfieldForm";
import { sendRequest } from '../utils/Helpers/HelpersMethod';
// import AddIcon from '@mui/icons-material/Add';
// import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../styles/dashboard.scss'

function Customer() {

  const [data, setData] = useState(CreateCustomer);
  const [errors, setErrors] = useState({});
  const resetData = CreateCustomer;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(data)
    const validationErrors = ValidateCustomer(data);
    const isValid = Object.keys(validationErrors).length === 0;
    // console.log(validationErrors, isValid);
    setErrors(validationErrors);
    if (isValid) {
      console.log(data);
      sendRequest("/customer/create", "POST", data)
        .then((res) => {
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            handleReset();
          }
        })
    } else {
      console.log(errors);
      toast.error("Enter Customer Details Properly");
    }
  }

  const handleReset = () => {
    setData(resetData);
  }

  useEffect(() => {
    sendRequest("/customer/getid", "POST")
      .then((res) => {
        if (res.success) {
          setData({ c_id: res.message });
        }
      })
  }, [data.c_id])

  return (
    <div className='font'>
      <ToastContainer />
      <Grid container direction="column" justifyContent="center" className='pa2'>
        <Grid item xs>
          <Grid container direction="row" alignItems="center">
            <Grid item xs className='ma3'>
              <div className='flex justify-start items-center'>
                <pre className='pr2 black'>{`Customer Id        #${data.c_id}`}</pre>
              </div>
              <div className='flex justify-start items-center'>
                <pre className='pr2 black'>Enter Name       </pre>
                <TextField
                  variant='outlined'
                  autoFocus
                  name='name'
                  value={data.name}
                  onChange={handleChange}
                  {...(errors.name && { error: true, helperText: errors.name })}
                  className='w-100'
                />
              </div>
              <div className='flex justify-start items-center'>
                <pre className='pr2 black'>Enter Contact 1 </pre>
                <TextField
                  variant='outlined'
                  name='phone'
                  inputProps={{ maxLength: 10 }}
                  value={data.phone}
                  onChange={handleChange}
                  {...(errors.phone && { error: true, helperText: errors.phone })}
                  className='w-100'
                />
              </div>
              <div className='flex justify-start items-center'>
                <pre className='pr2 black'>Enter Contact 2 </pre>
                <TextField
                  variant='outlined'
                  name='phone2'
                  inputProps={{ maxLength: 10 }}
                  value={data.phone2}
                  onChange={handleChange}
                  {...(errors.phone2 && { error: true, helperText: errors.phone2 })}
                  className='w-100'
                />
              </div>
            </Grid>
            <Grid item className='ma3'>
              <Avatar variant="rounded" sx={{ background: "#19A974", height: 175, width: 175 }}>
                <PersonAddIcon className="center" sx={{ fontSize: 100 }} />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className='flex justify-start items-center ma3'>
            <pre className='pr2 black'>Enter Address   </pre>
            <TextField
              variant='outlined'
              name='address'
              value={data.address}
              onChange={handleChange}
              {...(errors.address && { error: true, helperText: errors.address })}
              className='w-100'
              multiline
              rows={3}
            />
          </div>
        </Grid>
        <Grid item xs>
          <div className='flex justify-center center'>
            <p
              className='button-border link pointer tc ma2 bg-white ba bw1 dim dib w5 pa2 br2 b'
              onClick={handleClick}
            >Create Customer</p>
            <p
              className='button-border link pointer tc ma2 bg-dark-green b--black light-gray ba bw1 dim dib w5 pa2 br2 b'
              onClick={handleReset}
            >Reset</p>
          </div>
        </Grid>
      </Grid>
    </div >
  )
}

export default Customer