import React, { useEffect } from 'react'
import { price } from '../../utils/Data/InitialValues';
import { sendRequest } from '../../utils/Helpers/HelpersMethod';

function PrintReceiptTemplate({ jobData, customerData, ShirtData, PantData, receipt, advance }) {
  const createdAt = new Date(jobData.createdAt);
  const returnDate = new Date(jobData.returnDate);
  const [cprice, setPrice] = React.useState(price)
  const [Itemprice, setItemPrice] = React.useState({
  })

  useEffect(() => {
    sendRequest("/job/getCurrentJobPrice", "POST", { job_id: jobData.job_id })
      .then((res) => {
        const result = res.message;
        setPrice(result)
        setItemPrice({
          shirt_price: jobData.shirt_quantity === 0 ? 0 : jobData.shirt_quantity * result.shirt_price,
          pant_price: jobData.pant_quantity === 0 ? 0 : jobData.pant_quantity * result.pant_price
        })
      }).catch((err) => {
        console.log(err);
      })
  }, [jobData.job_id, jobData.pant_quantity, jobData.shirt_quantity])

  // console.log(advance)

  return (
    <div
      id="printContainer"
      className='flex w-60-l w-90-m center'
    >
      <table className='mv3 mh2 w-100 font'>
        <tbody>
          <tr>
            <td rowSpan={2} colSpan={3}>
              <div className='tc font'>
                <p className='f1 ls-header center mv0'>SHOWMAN</p>
                <p className='f4 ls ml4 mv0'>TAILORS</p>
              </div>
            </td>
            <td colSpan={1}>
              <p className='f4-xl b ma1'>Description</p>
            </td>
            <td>
              <p className='f4-xl b ma1'>Quantity</p>
            </td>
            <td>
              <p className='f4-xl b ma1'>Price</p>
            </td>
            <td>
              <p className='f4-xl b ma1'>Q.Price</p>
            </td>
            <td rowSpan={9}></td>
          </tr>
          <tr>
            <td rowSpan={4} colSpan={1} style={{ wordWrap: "break-word" }}>
              <p className='f4-xl b pb4 pl1 mt0'>{`પેન્ટ`}</p>
              <p className='f4-xl b pb4 pl1 mt0'>{`${ShirtData.shirt_type}`}</p> 
            </td>
            <td rowSpan={4}>
              <p className='f4-xl pb4 pl3 mt0'>{jobData.pant_quantity !== 0 ? `${jobData.pant_quantity}` : "-"}</p>
              <p className='f4-xl pb4 pl3 mt0'>{jobData.shirt_quantity !== 0 ? `${jobData.shirt_quantity}` : "-"}</p>
            </td>
            <td rowSpan={4}>
              <p className='f4-xl pb4 pl3 mt0'>{jobData.pant_quantity !== 0 ? `${cprice.pant_price}` : '-'}</p>
              <p className='f4-xl pb4 pl3 mt0'>{jobData.shirt_quantity !== 0 ? `${cprice.shirt_price}` : '-'}</p>
            </td>
            <td rowSpan={4}>
              <p className='f4-xl pb4 pl3 mt0'>{jobData.pant_quantity !== 0 ? `${Itemprice.pant_price}` : '-'}</p>
              <p className='f4-xl pb4 pl3 mt0'>{jobData.shirt_quantity !== 0 ? `${Itemprice.shirt_price}` : '-'}</p>
            </td>
          </tr>
          <tr>
            <td rowSpan={4} colSpan={3} style={{ wordWrap: "break-word" }}>
              <div className='mv4 mh2'>
                <p className='f4-xl b ma1'>Name</p>
                <p className='f4-xl ma1'>{`${customerData.name} (${customerData.c_id})`}</p>
                <pre className='f4-xl ma1'><span className='b'>Address</span>{`\t: ${customerData.address} `}</pre>
                <pre className='f4-xl ma1'><span className='b'>Job Id</span>{`\t: ${jobData.job_id}`}</pre>
                <pre className='f4-xl ma1'><span className='b'>Mobile</span>{`\t: ${customerData.phone}, ${customerData.phone2}`}</pre>
              </div>
            </td>
          </tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr>
            <td rowSpan={3} colSpan={3}>
              <div className='tc mb0'>
                <p className='mt2 mb1 b'>પેન્ટ શર્ટ સફારી સૂટ ના સ્પેશિયાલિસ્ટ</p>
                <p className='mv2 b'>જુનગામ, મેઇન રોડ, ફોર્ટ સોનગઢ, જી. તાપી</p>
                <p className='mv1 f5-xl'>Contact: 9426876500, 9913176500</p>
              </div>
            </td>
            <td colSpan={2}>
              <pre className='f4-xl ma1'><span className='b'>Job Date</span> {`\t  : ${createdAt.getDate() + '/' + Number(createdAt.getUTCMonth() + 1) + '/' + createdAt.getFullYear()}`}</pre>
            </td>
            <td>
              <pre className='f5-xl b ma1'>Item Total</pre>
            </td>
            <td>
              <pre className='f5-xl pl2 mv0'>{Itemprice.shirt_price + Itemprice.pant_price}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <pre className='f4-xl ma1'><span className='b'>Delivery Date</span> {`: ${returnDate.getDate() + '/' + Number(returnDate.getUTCMonth() + 1) + '/' + returnDate.getFullYear()}`}</pre>
            </td>
            <td>
              <pre className='f5-xl b ma1'>Advance</pre>
            </td>
            <td>
              <pre className='f5-xl pl2 mv0'>{advance}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td>
              <pre className='f5-xl b ma1'>Total</pre>
            </td>
            <td>
              <pre className='f5-xl pl2 mv0'>{Itemprice.shirt_price + Itemprice.pant_price - advance}</pre>
            </td>
          </tr>
        </tbody>
      </table>

    </div >
  )
}

export default PrintReceiptTemplate