import React, { useEffect } from 'react';
import PrintTemplate from '../components/PrintTemplate/PrintTemplate';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import { jobData as InitialValues } from '../utils/Data/InitialValues'
import '../styles/dashboard.scss';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { sendRequest } from '../utils/Helpers/HelpersMethod';
import { useSearchParams } from 'react-router-dom';


export default function Print() {
  const [queryParameters] = useSearchParams()
  const [jobData, setJobData] = React.useState({});
  const [PantData, setPantData] = React.useState({});
  const [ShirtData, setShirtData] = React.useState({});
  const [customerData, setCustomerData] = React.useState({});
  const ids={
    job_id:Number(queryParameters.get("job_id")),
    c_id:Number(queryParameters.get("c_id"))
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

  console.log(jobData, customerData, ShirtData, PantData)
  console.log("ids",ids)

  const HandlePrint = () => {
    html2canvas(document.querySelector("#printContainer"))
      .then(async (canvas) => {
        var printImg = canvas.toDataURL('image/png');
        var pdf = new jsPDF('l', 'mm');
        pdf.addImage(printImg, 'PNG', 75, 58, 220, 95, "PrintTemplate", "NONE");
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
        var pdf = new jsPDF('l', 'mm');
        pdf.addImage(printImg, 'PNG', 87, 60, 210, 90, "PrintTemplate", "NONE");
        pdf.save(`${jobData.job_id}.pdf`)
      })
  }

  return (
    <div className='mt3 center'>
      <div className='flex justify-start ml4'>
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
      </div>
      <PrintTemplate jobData={jobData} customerData={customerData} ShirtData={ShirtData} PantData={PantData} />
    </div>
  )
}
