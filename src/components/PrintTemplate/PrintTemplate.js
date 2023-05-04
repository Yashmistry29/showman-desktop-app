import React from 'react'
// import { Table, TableBody, TableCell, TableRow, TableContainer, Box, Paper } from '@mui/material'

function PrintTemplate({ jobData, customerData, ShirtData, PantData }) {
  const createdAt = new Date();
  const returnDate = new Date(jobData.returnDate);

  return (
    <div id="printContainer">
      <table className='mv3 mh0 w-100'>
        <tbody>

          <tr>
            <td colSpan={2}>
              <div className='font'>
                <pre className='f2 b ml5 mv3'>Showman Tailors</pre>
              </div>
            </td>
            <td colSpan={2} className="ph3 font1">
              <pre className='f3-xl mb1 b mt1'>{`Job Date    : ${createdAt.getDate() + '-' + Number(createdAt.getUTCMonth() + 1) + '-' + createdAt.getFullYear()}`}</pre>
              <pre className='f3-xl mb1 b mt1'>{`Customer Id : ${customerData.c_id}`}</pre>
            </td>
          </tr>
          <tr>
            <td className='pv3 font2' colSpan={2}>
              <div className='fl w-50 pa2'>
                <pre className='f3-xl mb4 ml2 b mt0'>{`પેન્ટ\t : ${jobData.pant_quantity}`}</pre>
                <pre className='f3-xl ma3'><span className="b">{`લંબાઈ\t : `}</span>{PantData === undefined ? "" : PantData.p_length}</pre>
                <pre className='f3-xl ma3'><span className="b">{`કમર\t : `}</span>{PantData === undefined ? "" : PantData.waist}</pre>
                <pre className='f3-xl ma3'><span className="b">{`ઝોલો\t : `}</span>{PantData === undefined ? "" : PantData.jholo}</pre>
                <pre className='f3-xl ma3'><span className="b">{`સીટ\t : `}</span>{PantData === undefined ? "" : PantData.seat}</pre>
                <pre className='f3-xl ma3'><span className="b">{`જાંઘ\t : `}</span>{PantData === undefined ? "" : PantData.thighs}</pre>
                <pre className='f3-xl ma3'><span className="b">{`ઘુંટણ\t : `}</span>{PantData === undefined ? "" : PantData.knee}</pre>
                <pre className='f3-xl ma3'><span className="b">{`મોરી\t : `}</span>{PantData === undefined ? "" : PantData.bottom}</pre>
              </div>
              <div className='fr w-50 pa2'>
                <pre className='f3-xl ma3'><span className="b">{`બેલ્ટ\t     : `}</span>{PantData === undefined ? "" : PantData.belt_type}</pre>
                <pre className='f3-xl ma3'><span className="b">{`પોકેટ\t     : `}</span>{PantData === undefined ? "" : PantData.pocket_type}</pre>
                <pre className='f3-xl ma3'><span className="b">{`ચીપટી\t     : `}</span>{PantData === undefined ? "" : PantData.chipti}</pre>
                <pre className='f3-xl ma3'><span className="b">{`બેક પોકેટ : `}</span>{PantData === undefined ? "" : PantData.back_pocket}</pre>
                <pre className='f3-xl ma3'><span className="b">{`વિગત \n`}</span></pre>
                <div>
                  <p className='f3-xl mv0 mh3 pa1 ba b--dashed dib pb5 w-90'>{PantData === undefined ? "" : PantData.description}</p>
                </div>
              </div>
            </td>
            <td className='pv3 font2' colSpan={2}>
              <div className='fl w-50 pa2'>
                <pre className='f3-xl mb4 ml2 mt0 b'>{`${ShirtData.shirt_type} : ${jobData.shirt_quantity}`}</pre>
                <pre className='f3-xl ma3'><span className="b">{`લંબાઈ : `}</span>{ShirtData === undefined ? "" : ShirtData.s_length}</pre>
                <pre className='f3-xl ma3'><span className="b">{`સોલ્ડર : `}</span>{ShirtData === undefined ? "" : ShirtData.shoulder}</pre>
                <pre className='f3-xl ma3'><span className="b">{`બાંય\t: `}</span>{ShirtData === undefined ? "" : ShirtData.sleeve}</pre>
                <pre className='f3-xl ma3'><span className="b">{`કફ\t\t: `}</span>{ShirtData === undefined ? "" : ShirtData.cuff}</pre>
                <pre className='f3-xl ma3'><span className="b">{`છાતી   : `}</span>{ShirtData === undefined ? "" : ShirtData.chest}</pre>
                <pre className='f3-xl ma3'><span className="b">{`કમર    : `}</span>{ShirtData === undefined ? "" : ShirtData.waist}</pre>
                <pre className='f3-xl ma3'><span className="b">{`સીટ     : `}</span>{ShirtData === undefined ? "" : ShirtData.seat}</pre>
              </div>
              <div className='fr w-50 pa2'>
                <pre className='f3-xl ma3'><span className="b">{`કોલર : `}</span>{ShirtData === undefined ? "" : ShirtData.collar}</pre>
                <pre className='f3-xl ma3'><span className="b">{`પોકેટ : `}</span>{ShirtData === undefined ? "" : ShirtData.pocket}</pre>
                <pre className='f3-xl ma3'><span className="b">{`પટ્ટી    : `}</span>{ShirtData === undefined ? "" : ShirtData.strip === 'in' ? 'અંદર' : ShirtData.strip === "out" ? 'આગળ' : ShirtData.strip}</pre>
                <pre className='f3-xl ma3'><span className="b">{`વિગત \n`}</span></pre>
                <div>
                  <p className='f3-xl mv0 mh3 pa1 ba b--dashed dib pb5 w-90'>{ShirtData === undefined ? "" : ShirtData.description}</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="ph2 font1">
              <pre className='f3-xl b ma1'>{`Name\t: ${customerData.name}`}</pre>
              <pre className='f3-xl b ma1'>{`Address\t: ${customerData.address}`}</pre>
              <pre className='f3-xl b ma1'>{`Contact\t: ${customerData.phone}, ${customerData.phone2}`}</pre>
            </td>
            <td colSpan={2} className="ph3 font1">
              <pre className='f3-xl b mt3'>{`JobNumber     : ${jobData.job_id}`}</pre>
              <pre className='f3-xl b ma1'>{`Delivery Date : ${returnDate.getDate() + '-' + Number(returnDate.getUTCMonth() + 1) + '-' + returnDate.getFullYear()}`}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PrintTemplate

  // < Table size = 'small' >
  //   <TableBody>
  //     <TableRow sx={{ border: "1px solid black" }}>
  //       <TableCell colSpan={2} sx={{ border: "1px solid black" }}>
  //         <div className='font fl w-50 pv2'>
  //           <pre className='f2 b ml5 mv3'>Showman Tailors</pre>
  //         </div>
  //         <div className='fl w-50 pv2'>
  //           <pre className='f3 mb1 b mt1'>{`Job Date\t: ${createdAt.getDate() + '-' + Number(createdAt.getUTCMonth() + 1) + '-' + createdAt.getFullYear()}`}</pre>
  //           <pre className='f3 mb1 b mt1'>{`Customer Id\t: ${customerData.c_id}`}</pre>
  //         </div>
  //       </TableCell>
  //     </TableRow>
  //     <TableRow sx={{ border: "1px solid black" }}>
  //       <TableCell sx={{ border: "1px solid black" }}>
  //         <div className='fl w-50 pv2'>
            // <pre className='f3-xl mb3 ml3 b mt1'>{`પેન્ટ \t: ${jobData.pant_quantity}`}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`લંબાઈ\t: `}</span>{PantData === undefined ? "" : PantData.p_length}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`કમર\t: `}</span>{PantData === undefined ? "" : PantData.waist}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`ઝોલો\t: `}</span>{PantData === undefined ? "" : PantData.jholo}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`સીટ\t: `}</span>{PantData === undefined ? "" : PantData.seat}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`જાંઘ\t: `}</span>{PantData === undefined ? "" : PantData.thighs}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`ઘુંટણ\t: `}</span>{PantData === undefined ? "" : PantData.knee}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`મોરી\t: `}</span>{PantData === undefined ? "" : PantData.bottom}</pre>
  //         </div>
  //         <div className='fl w-50 pv2'>
            // <pre className='f3-xl ma3'><span className="b">{`બેલ્ટ\t: `}</span>{PantData === undefined ? "" : PantData.belt_type}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`પોકેટ\t: `}</span>{PantData === undefined ? "" : PantData.pocket_type}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`ચીપટી\t: `}</span>{PantData === undefined ? "" : PantData.chipti}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`બેક પોકેટ\t: `}</span>{PantData === undefined ? "" : PantData.back_pocket}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`વિગત \n`}</span></pre>
            // <div>
            //   <p className='f3-xl mv0 mh3 pa1 ba b--dashed dib pb5 w-90'>{PantData === undefined ? "" : PantData.description}</p>
            // </div>
  //         </div>
  //       </TableCell>
  //       <TableCell sx={{ border: "1px solid black" }}>
  //         <div className='fl w-50 pv2'>
            // <pre className='f3-xl mb3 ml3 b mt1'>{`${ShirtData.shirt_type}\t: ${jobData.shirt_quantity}`}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`લંબાઈ\t: `}</span>{ShirtData === undefined ? "" : ShirtData.s_length}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`સોલ્ડર\t: `}</span>{ShirtData === undefined ? "" : ShirtData.shoulder}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`બાંય\t: `}</span>{ShirtData === undefined ? "" : ShirtData.sleeve}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`કફ\t: `}</span>{ShirtData === undefined ? "" : ShirtData.cuff}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`છાતી\t: `}</span>{ShirtData === undefined ? "" : ShirtData.chest}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`કમર\t: `}</span>{ShirtData === undefined ? "" : ShirtData.waist}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`સીટ\t: `}</span>{ShirtData === undefined ? "" : ShirtData.seat}</pre>
  //         </div>
  //         <div className='fl w-50 pv2'>
            // <pre className='f3-xl ma3'><span className="b">{`કોલર\t: `}</span>{ShirtData === undefined ? "" : ShirtData.collar}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`પોકેટ\t: `}</span>{ShirtData === undefined ? "" : ShirtData.pocket}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`પટ્ટી\t: `}</span>{ShirtData === undefined ? "" : ShirtData.strip === 'in' ? 'અંદર' : 'બાહર'}</pre>
            // <pre className='f3-xl ma3'><span className="b">{`વિગત \n`}</span></pre>
            // <div>
            //   <p className='f3-xl mv0 mh3 pa1 ba b--dashed dib pb5 w-90'>{ShirtData === undefined ? "" : ShirtData.description}</p>
            // </div>
  //         </div>
  //       </TableCell>
  //     </TableRow>
  //     <TableRow sx={{ border: "1px solid black" }}>
  //       <TableCell sx={{ border: "1px solid black" }}>
  //         <div >
            // <pre className='f3 b ma1'>{`Name\t: ${customerData.name}`}</pre>
            // <pre className='f3 b ma1'>{`Address\t: ${customerData.address}`}</pre>
            // <pre className='f3 b ma1'>{`Contact\t: ${customerData.phone}, ${customerData.phone2}`}</pre>
  //         </div>
  //       </TableCell>
  //       <TableCell sx={{ border: "1px solid black" }}>
  //         <div>
  //           <pre className='f3 b mt3'>{`JobNumber     : ${jobData.job_id}`}</pre>
  //           <pre className='f3 b ma1'>{`Delivery Date : ${returnDate.getDate() + '-' + Number(returnDate.getUTCMonth() + 1) + '-' + returnDate.getFullYear()}`}</pre>
  //         </div>
  //       </TableCell>
  //     </TableRow>
  //   </TableBody>
  //       </Table >