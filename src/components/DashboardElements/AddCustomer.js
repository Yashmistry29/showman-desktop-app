import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { CssTextField as TextField } from '../FormElements/TextfieldForm';
import { CreateCustomer } from '../../utils/Data/InitialValues';
import { ValidateCustomer } from '../../utils/Validation/FormValidation';
import { toast, ToastContainer } from 'react-toastify';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';
import { Avatar } from '@mui/material';



function AddCustomer() {
  const navigate = useNavigate();

  const [data, setData] = useState(CreateCustomer);
  const [errors, setErrors] = useState({});

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
            navigate('/measurement', { replace: true });
          }
        })
    } else {
      console.log(errors);
      toast.error("Enter Customer Details Properly");
    }
  }

  return (
    <div>
      <ToastContainer />
      <fieldset className='br3 b--black bw2'>
        <legend className='ph2 pr2 b'>Add Customer</legend>
        <div className='flex items-around'>
          <div>
            <div className='flex justify-start items-center'>
              <p className='pr2'>Enter Name&nbsp;&nbsp;&nbsp;</p>
              <TextField
                variant='outlined'
                name='name'
                value={data.name}
                onChange={handleChange}
                {...(errors.name && { error: true, helperText: errors.name })}
                className='w-50'
              />
            </div>
            <div className='flex justify-start items-center'>
              <p className='pr2'>Enter Mobile&nbsp;</p>
              <TextField
                variant='outlined'
                name='phone'
                value={data.phone}
                onChange={handleChange}
                {...(errors.username && { error: true, helperText: errors.username })}
                className='w-50'
              />
              {/* <AddIcon
                  className='ba link pointer tc ma2 pa1 br2'
                /> */}
            </div>
            <div className='flex justify-start items-center'>
              <p className='pr2'>Enter Address</p>
              <TextField
                variant='outlined'
                name='address'
                value={data.address}
                onChange={handleChange}
                {...(errors.address && { error: true, helperText: errors.address })}
                className='w-50'
                multiline
                rows={3}
              />
            </div>
          </div>
          <div>
            <Avatar variant="rounded" sx={{ background: "#000000", height: 200, width: 200 }}>
              <PersonAddIcon className="center" sx={{ fontSize: 100 }} />
            </Avatar>
          </div>
        </div>
        <div className='flex justify-start ma3 center pt2'>
          <p
            className='button-border link pointer tc ma2 bg-blue ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
            onClick={handleClick}
          >Create Customer</p>
          {/* <p
            className='button-border link pointer tc ma2 bg-blue ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
            onClick={handleClose}
          >Cancel</p> */}
        </div>
      </fieldset >
    </div >
  )
}

export default AddCustomer