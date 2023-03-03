import React from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateSearch as initialValues } from '../../utils/Data/InitialValues';
import { CssTextField } from '../FormElements/TextfieldForm';
import { toast, ToastContainer } from 'react-toastify';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';

function DateSearch({ data, setData }) {
  const [value, setValue] = React.useState(initialValues)
  const resetData = initialValues;


  const handleSearch = () => {
    // console.log(value)
    sendRequest('/job/getJobsBetweenDates', 'POST', value)
      .then((res) => {
        // console.log(res)
        if (res.success) {
          setData({
            customerData: res.customerData,
            jobData: res.data
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

  const handleReset = () => {
    setValue(resetData);
    setData({});
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ToastContainer />
      <fieldset className='br3 b--black bw2'>
        <legend className='ph2 pr2 b'>Find Job Between</legend>
        <div className='pa2'>
          <div className='flex justify-start items-center'>
            <pre className='black pr2'>Start Date</pre>
            <DatePicker
              disableMaskedInput
              views={['year', 'month', 'day']}
              inputFormat='DD-MMM-YYYY'
              minDate={new Date('2010-01-01')}
              openTo="year"
              value={value.startDate}
              onChange={(newValue) => {
                setValue({ ...value, startDate: newValue._d });
              }}
              name='startDate'
              renderInput={(params) =>
                <CssTextField
                  {...params}
                  className='w-60'
                />
              }
            />
          </div>
          <p className='black'>and</p>
          <div className='flex justify-start items-center'>
            <pre className='black pr2'>End Date  </pre>
            <DatePicker
              disableMaskedInput
              inputFormat='DD-MMM-YYYY'
              openTo='year'
              views={['year', 'month', 'day']}
              minDate={new Date('2010-01-01')}
              value={value.endDate}
              onChange={(newValue) => {
                setValue({ ...value, endDate: newValue._d });
              }}
              name='endDate'
              renderInput={(params) =>
                <CssTextField
                  {...params}
                  className='w-60'
                />
              }
            />
          </div>
          <br />
          <div className='flex justify-start'>
            <p
              className='button-border b--black link pointer tc ma2 bg-green light-gray ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
              onClick={handleSearch}
            >Search</p>
            <p
              className='button-border b--black link pointer tc ma2 bg-green light-gray ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
              onClick={handleReset}
            >Reset</p>
          </div>
        </div>
      </fieldset>
    </LocalizationProvider>
  )
}

export default DateSearch