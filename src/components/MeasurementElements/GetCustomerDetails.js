import React, { useState, useEffect } from 'react'
import { Autocomplete, MenuItem, createFilterOptions } from '@mui/material';
import { CssTextField } from '../FormElements/TextfieldForm';
import { sendRequest } from "../../utils/Helpers/HelpersMethod";

function GetCustomerDetails({ setId, setSData, setPData, setUpdate, setCustomerData, id, sQuantity, pQuantity, initial }) {

  const [jobSelect, setJobSelect] = useState(false);
  const [jobIds, setJobIds] = useState([]);
  const [jobId, setJobId] = useState(0);
  const [names, setNames] = useState([]);

  const handleChange = (e, value, option) => {
    // console.log(value, option)
    setId(value.id.toString());
    jobIds.splice(0, jobIds.length);
    if (value.job_ids === undefined) {
      setJobSelect(false);
      setJobId(0);
      setUpdate(false);
    } else {
      setJobSelect(true);
      setUpdate(true)
      value.job_ids.reverse();
      setJobIds(jobIds => [...jobIds, ...value.job_ids]);
    }
  }

  const handleSelect = (e) => {
    setJobId(e.target.value)
  }

  const handleView = (e) => {
    e.preventDefault();
    if (jobSelect) {
      sendRequest('/job/getJob', 'POST', { job_id: jobId.toString() })
        .then((resp) => {
          if (resp.success) {
            const data = resp.data;
            if (data.shirt_quantity === 0) {
              sQuantity(data.shirt_quantity);
              setSData(initial.shirt_data);
            } else {
              sQuantity(data.shirt_quantity);
              setSData(data.shirt_data);
            }

            if (data.pant_quantity === 0) {
              pQuantity(data.pant_quantity);
              setPData(initial.pant_data);
            } else {
              pQuantity(data.pant_quantity);
              setPData(data.pant_data);
            }
          }
        })
    }
    else {
      setPData(initial.pant_data);
      setSData(initial.shirt_data);
    }
  }

  useEffect(() => {
    sendRequest("/customer/getcustomer", "POST", { c_id: id })
      .then((res) => {
        if (res.success) {
          console.log(res.data)
          setCustomerData(res.data);
        }
      })
  }, [id, setCustomerData])

  useEffect(() => {
    sendRequest("/customer/getnamelist", 'POST')
      .then((res) => {
        if (res.success) {
          setNames(names => [...names, ...res.data]);
        }
      })
  }, [])

  // console.log(names, id)
  return (
    <div className='pt1'>
      <fieldset className='b--dashed b--black bw2'>
        <legend className='ph2 pr2 b'>Find Customer</legend>
        <div className='pa2'>
          <div className='flex justify-start items-center'>
            <pre className='black pr2'>Enter Name  </pre>
            <Autocomplete
              // disablePortal
              disableClearable
              options={names}
              fullWidth
              onChange={handleChange}
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
              filterOptions={createFilterOptions({
                matchFrom: "start",
                stringify: (option) => option.name
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <CssTextField
                {...params}
                variant='outlined'
                name='name'
                className='w-80'
              />}
            />
            {/* <CssTextField
              variant='outlined'
              name='name'
              className='w-50'
            /> */}
          </div>
          <div className='flex justify-start items-center bold'>
            <pre className='black pr2'>Select Job    </pre>
            <CssTextField
              select={jobSelect}
              disabled={!jobSelect}
              variant='outlined'
              name='jobId'
              className='w-25'
              onChange={handleSelect}
              value={jobId}
              size={jobSelect ? "small" : "normal"}
            >
              {
                jobIds.map((val) => (
                  <MenuItem key={val} value={val} sx={{
                    "& li": {
                      backgroundColor: "white",
                    },
                    "&:hover": {
                      backgroundColor: "#9966cb",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#9966cb",
                    }
                  }}>
                    {val}
                  </MenuItem>
                ))
              }
            </CssTextField>
            <button
              className='button-border b--black link pointer tc ma2 bg-button light-gray ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
              onClick={handleView}
            >View</button>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default GetCustomerDetails