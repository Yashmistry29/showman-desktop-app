import React, { useEffect } from 'react';
import PrintJobData from '../components/PrintTemplate/PrintJobDataTemplate';
import PrintReceipt from '../components/PrintTemplate/PrintReceiptTemplate';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import IosShareIcon from '@mui/icons-material/IosShare';
import { jobData as InitialValues } from '../utils/Data/InitialValues'
import '../styles/dashboard.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { sendRequest } from '../utils/Helpers/HelpersMethod';
import { useSearchParams } from 'react-router-dom';
import { CssTextField, MenuItemStyle as MenuStyle } from '../components/FormElements/TextfieldForm';
import { MenuItem } from '@mui/material';

export default function Print() {
  const [queryParameters] = useSearchParams()
  const [jobData, setJobData] = React.useState({});
  const [PantData, setPantData] = React.useState({});
  const [ShirtData, setShirtData] = React.useState({});
  const [customerData, setCustomerData] = React.useState({});
  const [receipt, setReceipt] = React.useState(false);
  const ids={
    job_id:Number(queryParameters.get("job_id")),
    c_id: Number(queryParameters.get("c_id")),
  }

  useEffect(()=>{
    sendRequest('/job/getJob','POST',{job_id:ids.job_id})
      .then(result=>{
        if(result){
          var printContents = result.data;
          // console.log(printContents);
          setJobData(printContents);
          printContents.pant_quantity === 0 ?
            setPantData(InitialValues.pant_data) :
            setPantData(printContents.pant_data);
          printContents.shirt_quantity === 0 ?
            setShirtData(InitialValues.shirt_data) :
            setShirtData(printContents.shirt_data);
        }
      })
      sendRequest('/customer/getcustomer','POST',{c_id:ids.c_id})
      .then(result=>{
        if(result){
          var printContents = result.data;
          // console.log(printContents);
          setCustomerData(printContents);
        }
      })
      // eslint-disable-next-line
  },[])

  // console.log(jobData, customerData, ShirtData, PantData)
  // console.log("ids",ids)

  const HandlePrint = () => {
    html2canvas(document.querySelector("#printContainer"))
      .then(async (canvas) => {
        var printImg = canvas.toDataURL('image/png');
        var pdf = new jsPDF('p', 'mm');
        pdf.addImage(printImg, 'PNG', 0, 5, 210, 95, "PrintTemplate", "NONE");
        const data = pdf.output('bloburl');
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.src = data;
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
      })
  }

  const HandleSave = () => {
    html2canvas(document.querySelector("#printContainer"))
      .then(canvas => {
        var printImg = canvas.toDataURL('image/png');
        var pdf = new jsPDF('p', 'mm');
        pdf.addImage(printImg, 'PNG', 0, 4, 210, 95, "PrintTemplate", "NONE");
        pdf.save(`${jobData.job_id}.pdf`)
      })
  }

  const handleSelect = (e) => {
    setReceipt(e.target.value)
  }

  return (
    <div className='mt3 center'>
      <div className='flex justify-start ml4 w-50'>
        <PrintIcon
          className='button-border link pointer tc ma2 bg-white ba bw1 dib pa2 br2 b'
          titleAccess="Print Job"
          onClick={HandlePrint}
        />
        <SaveIcon
          className='button-border link pointer tc ma2 bg-white ba bw1 dib pa2 br2 b'
          titleAccess="Save Job"
          onClick={HandleSave}
        />
        <CssTextField
          select
          variant='outlined'
          name='receipt'
          className='w-50 ma2 pa1'
          onChange={handleSelect}
          value={receipt}
          size="small"
        >
          <MenuItem key={0} sx={MenuStyle} value={false}>Print Job Data</MenuItem>
          <MenuItem key={1} sx={MenuStyle} value={true}>Print Receipt</MenuItem>
        </CssTextField>
        {/* <FormControlLabel
          control={
            <Checkbox
              // sx={{
              //   color: grey[900],
              //   '&.Mui-checked': {
              //     color: grey[900],
              //   },
              // }}
              checked={receipt}
              name="receipt"
              onChange={(e) => setReceipt(e.target.checked)}
            />
          }
          label="Show Receipt"
          className='black'
        /> */}
        {
          receipt ?
            <IosShareIcon
              className='button-border link pointer tc ma2 bg-white ba bw1 dib pa2 br2 b'
              titleAccess="Save Job"
              onClick={HandleSave}
            /> : ''
        }
      </div>
      {
        receipt ?
          <PrintReceipt jobData={jobData} customerData={customerData} ShirtData={ShirtData} PantData={PantData} /> :
          <PrintJobData jobData={jobData} customerData={customerData} ShirtData={ShirtData} PantData={PantData} />
      }
    </div>
  )
}
