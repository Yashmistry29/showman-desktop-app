import React, { useEffect, useState } from 'react';
import { Grid, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import CustomerDataDisplay from '../components/MeasurementElements/CustomerDataDisplay';
import GetCustomerDetails from '../components/MeasurementElements/GetCustomerDetails';
import { checked } from '../utils/Data/InitialValues';
import { grey } from '@mui/material/colors';
import CustomerMeasurement from '../components/MeasurementElements/CustomerMeasurement';
import { CssTextField } from '../components/FormElements/TextfieldForm';
import { validateShirtData, validatePantData, validateDate } from '../utils/Validation/FormValidation';
import { toast, ToastContainer } from 'react-toastify';
import { jobData } from '../utils/Data/InitialValues';
import '../styles/dashboard.scss';
const electron = window.require("electron");

function Measurement() {

  const [id, setId] = useState("");
  const [jobId, setJobId] = useState(0);
  const [sErrors, setsErrors] = useState({});
  const [pErrors, setpErrors] = useState({});
  const [dateError, setDateError] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [checkedData, setCheckedData] = useState(checked);
  const [sQuantity, setSQuantity] = useState(jobData.shirt_quantity);
  const [pQuantity, setPQuantity] = useState(jobData.pant_quantity);
  const [returnDate, setReturnDate] = useState(jobData.returnDate)
  const [sData, setSData] = useState(jobData.shirt_data);
  const [pData, setPData] = useState(jobData.pant_data);
  const [update, setUpdate] = useState(false);
  const [totalPrice,setTotalPrice]=useState(0);
  const resetData = jobData;
  const resetChecked = checked;

  useEffect(() => {
    sendRequest("/price/getprice", "POST")
      .then((res) => {
        const price = res.data;
        sData["price"] = price.shirt_price;
        pData["price"] = price.pant_price;
      }).catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCheckedData({ ...checkedData, [name]: checked });
  }

  useEffect(()=>{
    var total=0
    if (checkedData.pant) {
      total += Number(pData.price) * pQuantity;
    }
    if (checkedData.shirt) {
      total += Number(sData.price) * sQuantity;
    }
    setTotalPrice(total);
  },[checkedData.pant, checkedData.shirt, pData.price, pQuantity, sData.price, sQuantity])


  useEffect(() => {
    if (!checkedData.pant) {
      setPQuantity(0);
    }
    if (checkedData.pant) {
      setPQuantity(1);
    }

    if (!checkedData.shirt) {
      setSQuantity(0);
    }
    if (checkedData.shirt) {
      setSQuantity(1);
    }
  }, [checkedData.pant, checkedData.shirt])

  const handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      job_id: jobId,
      shirt_quantity: sQuantity,
      pant_quantity: pQuantity,
      createdAt: new Date(jobData.createdAt),
      returnDate: new Date(returnDate),
      totalPrice: 0
    }
    var panterrors, shirterrors;
    var isValidPant, isValidShirt;
    if (checkedData.pant) {
      panterrors = validatePantData(pData);
      isValidPant = Object.keys(panterrors).length === 0;
      setpErrors(panterrors);
      data.totalPrice += Number(pData.price) * data.pant_quantity;
      data["pant_data"] = pData;
    }
    if (checkedData.shirt) {
      shirterrors = validateShirtData(sData);
      isValidShirt = Object.keys(shirterrors).length === 0;
      setsErrors(shirterrors);
      data.totalPrice += Number(sData.price) * data.shirt_quantity;
      data["shirt_data"] = sData;
    }
    setTotalPrice(data.totalPrice);  
    var dateerrors = validateDate(data.createdAt, data.returnDate);
    var isValidDate = Object.keys(dateerrors).length === 0;
    setDateError(dateerrors);
    console.log(data, isValidPant, isValidShirt, isValidDate);
    if ((isValidPant || isValidShirt) && isValidDate) {
      const route = update ? '/job/updateJob' : '/job/createJob';
      console.log(route);
      sendRequest(route, 'POST', { c_id: id, jobData: data })
        .then((res) => {
          if (res.success) {
            toast.success(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "colored",
            });
          } else {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              theme: "colored",
            });
          }
          handleReset();
          electron.ipcRenderer.send('jobDetails', ({ job_id:data.job_id, c_id: customerData.c_id }));
        })
    }
  }

  const handleDateChange = (e) => {
    setReturnDate(e.target.value);
  }

  const handleReset = (e) => {
    setCheckedData({ ...resetChecked });
    setSQuantity(resetData.no_of_shirts);
    setPQuantity(resetData.no_of_pants);
    setSData({ ...resetData.shirt_data });
    setPData({ ...resetData.pant_data });
    setReturnDate(jobData.returnDate);
    setpErrors({});
    setsErrors({});
    setCustomerData({});
    setJobId(0);
  }

  useEffect(() => {
    sendRequest("/job/getid", "POST")
      .then((res) => {
        if (res.success) {
          setJobId(res.message);
        }
      })
  }, [jobId])

  // console.log(customerData);
  return (
    <div>
      <ToastContainer />
      <div className='flex w-90 center mt4 font'>
        <Grid container direction="row" alignItems="flex-start" justify="space-between" spacing={3}>
          <Grid item xs={12} md={6}>
            <CustomerDataDisplay data={customerData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <GetCustomerDetails setId={setId} setSData={setSData} setPData={setPData} setUpdate={setUpdate} setCustomerData={setCustomerData} id={id} sQuantity={setSQuantity} pQuantity={setPQuantity} initial={resetData} />
            <FormGroup row>
              <pre className='pr2 black mr2'>{`Job Id: ${jobId}`}</pre>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: grey[900],
                      '&.Mui-checked': {
                        color: grey[900],
                      },
                    }}
                    checked={checkedData.pant}
                    name="pant"
                    onChange={handleChange}
                  />
                }
                label="Pant"
                className='black'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: grey[900],
                      '&.Mui-checked': {
                        color: grey[900],
                      },
                    }}
                    name="shirt"
                    checked={checkedData.shirt}
                    onChange={handleChange}
                  />
                }
                label="Shirt"
                className='black'
              />
            </FormGroup>
          </Grid>
        </Grid>
      </div>
      <CustomerMeasurement checkedData={checkedData} sData={sData} pData={pData} setSData={setSData} setPData={setPData} shirtQuantity={sQuantity} pantQuantity={pQuantity} setSQuantity={setSQuantity} setPQuantity={setPQuantity} sErrors={sErrors} pErrors={pErrors} />
      <div className='flex flex-column-m w-90 justify-end center mv2 font b--dashed'>
        <pre className='pr2 f3 black mr2'>Total Price: <span className='b'>{totalPrice}</span>&#8377;</pre>
        <div className='flex justify-start items-center'>
          <p className='black f4 ph2'>Created At</p>
          <CssTextField
            name='createdAt'
            className='w-60'
            value={jobData.createdAt.getDate() + '-' + jobData.createdAt.getMonth() + 1 + '-'
              + jobData.createdAt.getFullYear()}
            focused
            disabled
          />
        </div>
        <div className='flex justify-start items-center'>
          <pre className='black f4 ph2'>Return Date</pre>
          <CssTextField
            name='ReturnDate'
            type='date'
            size='small'
            className='w-60'
            value={returnDate}
            onChange={handleDateChange}
            {...(dateError.date && { error: true, helperText: dateError.date })}

          />
          <div className='flex justify-start items-center ph3'>
            <p
              className='button-border link pointer tc ma2 f4 bg-white ba bw1 dim dib w2 w4-l w3-m pa2 br2 b'
              onClick={handleSubmit}
            >Submit</p>
            <p
              className='button-border link pointer tc ma2 f4 bg-white ba bw1 dim dib w2 w4-l w3-m pa2 br2 b'
              onClick={handleReset}
            >Reset</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Measurement