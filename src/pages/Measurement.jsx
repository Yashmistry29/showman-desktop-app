import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { sendRequest } from "../utils/Helpers/HelpersMethod";
import CustomerDataDisplay from '../components/MeasurementElements/CustomerDataDisplay';
import GetCustomerDetails from '../components/MeasurementElements/GetCustomerDetails';
import CustomerMeasurement from '../components/MeasurementElements/CustomerMeasurement';
import { CssTextField } from '../components/FormElements/TextfieldForm';
import { validateShirtData, validatePantData, validateDate, ValidateCustomer } from '../utils/Validation/FormValidation';
import { jobData, CreateCustomer as c_data, checked as initialChecked } from '../utils/Data/InitialValues';
import { grey } from '@mui/material/colors';
import { toast, ToastContainer } from 'react-toastify';
import '../styles/dashboard.scss';
const electron = window.require("electron");

function Measurement() {

  const [id, setId] = useState(0);
  const [jobId, setJobId] = useState(0);
  const [selectjobId, setselectJobId] = useState(0);
  const [errors, setErrors] = useState({ shirt: {}, pant: {}, date: {}, customer: {} });
  const [customerData, setCustomerData] = useState(c_data);
  const [checkedData, setCheckedData] = useState(initialChecked);
  const [quantities, setQuantities] = useState({ shirt: jobData.shirt_quantity, pant: jobData.pant_quantity });
  const [priceData, setPriceData] = useState({});
  const [returnDate, setReturnDate] = useState(jobData.returnDate)
  const [sData, setSData] = useState(jobData.shirt_data);
  const [pData, setPData] = useState(jobData.pant_data);
  const [view, setView] = useState(false);
  const [update, setUpdate] = useState(false);
  const [names, setNames] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);


  useEffect(() => {
    sendRequest("/price/getprice", "POST")
      .then((res) => {
        const price = res.data;
        sData["price"] = price.shirt_price;
        pData["price"] = price.pant_price;
        setPriceData({ shirt: res.data.shirt_price, pant: res.data.pant_price })
      }).catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadCustomerNames = async () => {
    const res = await sendRequest("/customer/getnamelist", 'POST');
    if (res.success) setNames(res.data);
  }

  useEffect(() => {
    loadCustomerNames();
  }, [])

  const totalPrice = useMemo(() => {
    let total = 0;
    if (checkedData.pant) total += Number(pData.price) * quantities.pant;
    if (checkedData.shirt) total += Number(sData.price) * quantities.shirt;
    return total;
  }, [checkedData.pant, checkedData.shirt, pData.price, quantities.pant, quantities.shirt, sData.price]);

  useEffect(() => {
    setQuantities((prev) => ({
      shirt: checkedData.shirt ? 1 : 0,
      pant: checkedData.pant ? 1 : 0,
    }));
  }, [checkedData.pant, checkedData.shirt])

  useEffect(() => {
    sendRequest("/job/getid", "POST")
      .then((res) => res.success && setJobId(res.message))
      .catch((err) => console.error(err));
  }, [jobId])

  const handleChange = (e) => {
    setCheckedData((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleDateChange = (e) => {
    setReturnDate(e.target.value);
  }

  const prepareJobData = () => {
    return {
      job_id: jobId,
      shirt_quantity: quantities.shirt,
      pant_quantity: quantities.pant,
      createdAt: new Date(jobData.createdAt),
      returnDate: new Date(returnDate),
      totalPrice: 0
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = prepareJobData();

    const newErrors = { shirt: {}, pant: {}, date: {}, customer: {} };
    var isValidCustomer, isValidPant, isValidShirt

    if (checkedData.pant) {
      const pantErrors = validatePantData(pData);
      isValidPant = Object.keys(pantErrors).length === 0
      newErrors.pant = pantErrors
      data.totalPrice += Number(pData.price) * data.pant_quantity;
      data["pant_data"] = pData;
    }

    if (checkedData.shirt) {
      const shirtErrors = validateShirtData(sData);
      isValidShirt = Object.keys(shirtErrors).length === 0
      newErrors.shirt = shirtErrors
      data.totalPrice += Number(sData.price) * data.pant_quantity;
      data["shirt_data"] = sData;
    }

    const dateErrors = validateDate(data.createdAt, data.returnDate);
    const isValidDate = Object.keys(dateErrors).length === 0
    newErrors.date = dateErrors

    const customerError = ValidateCustomer(customerData)
    isValidCustomer = Object.keys(customerError).length === 0
    newErrors.customer = customerError

    setErrors(newErrors)

    console.log(isValidPant, isValidShirt, isValidDate, isValidCustomer, customerData)

    if ((isValidPant || isValidShirt) && isValidDate && isValidCustomer) {
      var route = '/customer/create';
      var c_id = (view) ? { data: customerData.c_id } : await sendRequest(route, 'POST', customerData)
      console.log(c_id)
      route = update ? '/job/updateJob' : '/job/createJob';
      console.log(route, data);
      var res = await sendRequest(route, 'POST', { c_id: c_id.data, jobData: data })
      console.log(res)
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
        handleReset();
        electron.ipcRenderer.send('jobDetails', ({ job_id: data.job_id, c_id: customerData.c_id }));
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
    }
  }


  const handleReset = () => {
    setCheckedData(initialChecked);
    setQuantities({ shirt: jobData.shirt_quantity, pant: jobData.pant_quantity });
    setSData(jobData.shirt_data);
    setPData(jobData.pant_data);
    setReturnDate(jobData.returnDate);
    setErrors({ shirt: {}, pant: {}, date: {}, customer: {} });
    setCustomerData(c_data);
    setId(0);
    setJobId(0);
    setselectJobId(0);
    setView(false);
    setSelectedCustomer(null);
    loadCustomerNames();
  };

  // console.log(quantities);
  return (
    <div>
      <ToastContainer />
      <div className='flex w-90 center mt4 font'>
        <Grid container direction="row" alignItems="flex-start" justify="space-between" spacing={3}>
          <Grid item xs={12} md={6}>
            <CustomerDataDisplay
              data={customerData}
              view={view}
              setCustomerData={setCustomerData}
              setView={setView}
              setId={setId}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <GetCustomerDetails
              names={names}
              setId={setId}
              price={priceData}
              setUpdate={setUpdate}
              setCustomerData={setCustomerData}
              id={id}
              setSData={setSData}
              setPData={setPData}
              setQuantities={setQuantities}
              initial={jobData}
              setView={setView}
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              jobId={selectjobId}
              setJobId={setselectJobId}
            />
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
      <CustomerMeasurement
        checkedData={checkedData}
        sData={sData}
        pData={pData}
        setSData={setSData}
        setPData={setPData}
        quantities={quantities}
        setQuantities={setQuantities}
        errors={errors}
      />
      {/* donot change UI for this div tag*/}
      <div className='flex flex-column-m w-90 justify-end center mv2 font b--dashed'>
        <pre className='pr2 f3 black mr2'>Total Price: <span className='b'>{totalPrice}</span>&#8377;</pre>
        <div className='flex justify-start items-center'>
          <p className='black f4 ph2'>Created At</p>
          <CssTextField
            name='createdAt'
            className='w-60'
            value={jobData.createdAt.getDate() + '-' + Number(jobData.createdAt.getMonth() + 1) + '-'
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
            error={Boolean(errors.date.date)}
            helperText={errors.date.date}

          />
          <div className='flex justify-start items-center ph3'>
            <button
              className='button-border link pointer tc ma2 f4 bg-green white ba bw1 dim dib w2 w4-l w3-m pa2 br2'
              onClick={handleSubmit}
            >Submit</button>
            <button
              className='button-border link pointer tc ma2 f4 bg-white ba bw1 dim dib w2 w4-l w3-m pa2 br2'
              onClick={handleReset}
            >Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Measurement