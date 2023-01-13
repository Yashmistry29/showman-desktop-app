import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, TextField, Avatar } from '@mui/material'
import { CreateCustomer } from '../../utils/Data/InitialValues';
import { ValidateCustomer } from '../../utils/Validation/FormValidation';
import { toast, ToastContainer } from 'react-toastify';
// import AddIcon from '@mui/icons-material/Add';
// import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';

function AddCustomer({ dialogOpen, onClose }) {

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

  const handleClose = () => {
    onClose(false)
  }

  return (
    <div>
      <ToastContainer />
      <Dialog open={dialogOpen} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>New Customer/ નવો ગ્રાહક</DialogTitle>
        <DialogContent>
          <div className='flex items-start'>
            <div>
              <div className='flex justify-start items-center'>
                <pre className='pr2'>Enter Name   </pre>
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
                <pre className='pr2'>Enter Mobile </pre>
                <TextField
                  variant='outlined'
                  name='phone'
                  type='number'
                  inputProps={{ maxLength: 10 }}
                  value={data.phone}
                  onChange={handleChange}
                  {...(errors.phone && { error: true, helperText: errors.phone })}
                  className='w-50'
                />
              </div>
              <div className='flex justify-start items-center'>
                <pre className='pr2'>Enter Address</pre>
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
              <Avatar variant="rounded" sx={{ background: "#6EB6FF", height: 200, width: 200 }}>
                <PersonAddIcon className="center" sx={{ fontSize: 100 }} />
              </Avatar>
            </div>
          </div>
          <div className='flex justify-start ma3 center pt2'>
            <p
              className='button-border link pointer tc ma2 bg-blue ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
              onClick={handleClick}
            >Create Customer</p>
            <p
              className='button-border link pointer tc ma2 bg-blue ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
              onClick={handleClose}
            >Cancel</p>
          </div>
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default AddCustomer