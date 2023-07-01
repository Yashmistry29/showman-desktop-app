import React, { useState, useEffect } from 'react'
import { Avatar, Grid, Autocomplete, createFilterOptions } from '@mui/material'
import { CreateCustomer } from '../utils/Data/InitialValues';
import { ValidateCustomer } from '../utils/Validation/FormValidation';
import { toast, ToastContainer } from 'react-toastify';
import { CssTextField as TextField } from "../components/FormElements/TextfieldForm";
import { sendRequest } from '../utils/Helpers/HelpersMethod';
import { CustomerSearch as initialValues } from '../utils/Data/InitialValues';
import { NewCustomer } from '../utils/Data/InitialValues';
// import AddIcon from '@mui/icons-material/Add';
// import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../styles/dashboard.scss'

function Customer() {

  const [newCustomer, setNewCustomer] = useState(NewCustomer);
  const [search, setSearch] = useState(initialValues)
  const [data, setData] = useState(CreateCustomer);
  const [c_id, setId] = useState();
  const [errors, setErrors] = useState({});
  const resetData = CreateCustomer;
  const result = "";
  const [names, setNames] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleAutocomplete = (e, value, option) => {
    // console.log(value, option)
    setSearch({ ...search, name: value.id });
    setId(value.id)
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
      const route = newCustomer ? '/customer/create' : '/customer/edit'
      sendRequest(route, "POST", data)
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
          } else {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
    } else {
      console.log(errors);
      toast.error("Enter Customer Details Properly");
    }
  }

  const handleReset = () => {
    setData(resetData);
    setErrors({})
    setNewCustomer(true);
  }

  const handleFind = (e) => {
    setNewCustomer(false)
    sendRequest('/customer/getcustomer', 'POST', { c_id: c_id })
      .then(res => {
        if (res) {
          var val = {
            c_id: res.data.c_id,
            name: res.data.name,
            phone: res.data.phone,
            phone2: res.data.phone2,
            address: res.data.address
          }
          // console.log(data)
          setData(val);
        }
      })
  }

  useEffect(() => {
    if (newCustomer && data.c_id === 0) {
      sendRequest("/customer/getid", "POST")
        .then((res) => {
          if (res.success) {
            setData({ c_id: res.message });
          }
        })
    }
  }, [newCustomer, data.c_id])

  useEffect(() => {
    sendRequest("/customer/getnamelist", 'POST')
      .then((res) => {
        if (res.success) {
          names.splice(0, names.length);
          setNames(names => [...names, ...res.data]);
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='font'>
      <ToastContainer />
      <Grid container direction="column" justifyContent="center" className='pa2'>
        <Grid item xs className='ml3 mr3 mt3'>
          <div className='flex justify-start items-center'>
            <pre className='pr2 black'>Search               </pre>
            <Autocomplete
              freeSolo
              options={names}
              fullWidth
              size='small'
              onChange={handleAutocomplete}
              filterOptions={createFilterOptions({
                matchFrom: "start",
                stringify: (option) => option.name
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField
                {...params}
                value={search.name}
                variant='outlined'
                className='w-100'
                autoFocus
              />}
            />
            <button
              onClick={handleFind}
              className="button-border pointer tc mh2 bg-dark-green b--black light-gray ba bw1 dim dib w-30 h2 br2 b"
            >Search</button>
          </div>
        </Grid>
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
            <button
              className='button-border pointer tc ma2 bg-white ba bw1 dim dib w5 pa2 br2 b'
              onClick={handleClick}
            >{newCustomer ? 'Create Customer' : 'Update Customer'} </button>
            <button
              className='button-border pointer tc ma2 bg-dark-green b--black light-gray ba bw1 dim dib w5 pa2 br2 b'
              onClick={handleReset}
            >Reset</button>
          </div>
        </Grid>
      </Grid>
      <p>{result}</p>
    </div >
  )
}

export default Customer