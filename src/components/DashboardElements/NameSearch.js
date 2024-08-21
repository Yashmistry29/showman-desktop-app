import React, { useState, useEffect } from 'react'
import { CssTextField } from '../FormElements/TextfieldForm';
import { NameSearch as initialValues } from '../../utils/Data/InitialValues';
import { Autocomplete, createFilterOptions } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';

function NameSearch({ data, setData, setPage }) {

  const [names, setNames] = useState([]);
  const [search, setSearch] = useState(initialValues)
  const resetData = initialValues;

  const handleSearch = () => {
    // console.log(search);
    if (search.name !== '-') {
      sendRequest("/job/getAllJobDataByName", "POST", search)
        .then((res) => {
          if (res.success) {
            var data = res.data.reverse();
            setData({
              customerData: res.customerData,
              jobData: data
            })
          }
        })
    }
    if (search.mobile !== '') {
      sendRequest('/job/getAllJobDataByMobile', 'POST', search)
        .then((res) => {
          // console.log(res);
          var data = res.data.reverse();
          if (res.success) {
            setData({
              customerData: res.customerData,
              jobData: data
            })
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
    }
  }

  const handleReset = () => {
    setSearch(resetData);
    setData({});
    setPage(0);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  }

  const handleAutocomplete = (e, value, option) => {
    // console.log(value, option)
    setSearch({ ...search, name: value.id });
  }

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

  // console.log(search);

  return (
    <div className='pt1'>
      <ToastContainer />
      <fieldset className='b--dashed b--black bw2'>
        <legend className='ph2 pr2 b'>Search Job using Name or Mobile/ નામ અથવા મોબાઈલ નં.</legend>
        <div className='pa2'>
          <div className='flex justify-start items-center'>
            <pre className='black pr2 font'>Enter Name  </pre>
            <Autocomplete
              disableClearable
              freeSolo
              options={names}
              fullWidth
              size='small'
              ListboxProps={{
                sx: {
                  "& li": {
                    backgroundColor: "white",
                  },
                  "&:hover": {
                    backgroundColor: "#9966cb",
                  }
                }
              }}
              onChange={handleAutocomplete}
              filterOptions={createFilterOptions({
                matchFrom: "start",
                stringify: (option) => option.name
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <CssTextField
                {...params}
                value={search.name}
                variant='outlined'
                className='w-60'
                autoFocus

              />}
            />
            {/* <CssTextField
              variant='outlined'
              name='name'
              value={search.name}
              onChange={handleChange}
              className='w-50'
            /> */}
          </div>
          <p className='black'>or</p>
          <div className='flex justify-start items-center'>
            <pre className='black pr2'>Enter Mobile</pre>
            <CssTextField
              variant='outlined'
              name='mobile'
              inputProps={{ maxLength: 10 }}
              value={search.mobile}
              onChange={handleChange}
              className='w-50'
            />
          </div>
          <br />
          <div className='flex justify-start'>
            <button
              className='button-border b--black link pointer tc ma2 bg-button light-gray ba bw1 dim dib w3 w5-l w4-m pa2 br2'
              onClick={handleSearch}
            >Search</button>
            <button
              className='button-border b--black link pointer tc ma2 bg-button light-gray ba bw1 dim dib w3 w5-l w4-m pa2 br2'
              onClick={handleReset}
            >Reset</button>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default NameSearch