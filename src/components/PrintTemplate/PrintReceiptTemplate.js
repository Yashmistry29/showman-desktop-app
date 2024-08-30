import React, { useEffect } from 'react'
import { price } from '../../utils/Data/InitialValues';
import mainlogo from "../../images/SM_Logo.png";
import { sendRequest } from '../../utils/Helpers/HelpersMethod';

function PrintReceiptTemplate({ jobData, customerData, ShirtData, PantData, receipt, advance }) {
  const createdAt = new Date(jobData.createdAt);
  const returnDate = new Date(jobData.returnDate);
  const [cprice, setPrice] = React.useState(price)
  const [Itemprice, setItemPrice] = React.useState({
    shirt_price: jobData.pant_quantity * cprice.shirt_price,
  })

  useEffect(() => {
    sendRequest("/job/getCurrentJobPrice", "POST",{job_id:jobData.job_id})
      .then((res) => {
        const result = res.message;
        setPrice(result)
        setItemPrice({
          shirt_price: jobData.shirt_quantity * result.shirt_price,
          pant_price: jobData.pant_quantity * result.pant_price
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
      <table className='mv3 mh2 w-100'>
        <tbody>
          <tr>
            <td rowSpan={7} colSpan={3}>
              <div className='font flex flex-column items-center'>
                <div className='tc'>
                  <p className='f1 b center mv0'>SHOWMAN</p>
                  <p className='f4 ls b ml4 mv0'>TAILORS</p>
                  <p className='mt2 mb0 b'>પેન્ટ શર્ટ સફારી સૂટ ના સ્પેશિયાલિસ્ટ </p>
                </div>
                <div className="flex flex-column w-90 center tc pa2">
                  <img src={mainlogo} alt="logo" className="w-100" />
                </div>
                <div className='tc mv1'>
                  <p className='mb0 b'>જુનગામ, મેઇન રોડ, ફોર્ટ સોનગઢ, જી. તાપી</p>
                  <p className='mv0 f5-xl'>Contact: 9426876500, 9913176500</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="ph2" colSpan={6}>
              <pre className='f4-xl b ma1'>{`Job No.:${jobData.job_id}\tનામ: ${customerData.name} (${customerData.c_id})`}</pre>
              <pre className='f4-xl b ma1'>{`Job Date: ${createdAt.getDate() + '/' + Number(createdAt.getUTCMonth() + 1) + '/' + createdAt.getFullYear()}\tગામ: ${customerData.address}`}</pre>
              <pre className='f4-xl b ma1'>{`Delivery: ${returnDate.getDate() + '/' + Number(returnDate.getUTCMonth() + 1) + '/' + returnDate.getFullYear()}\tફોન નં: ${customerData.phone}, ${customerData.phone2}`}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={3} className='bg-black-40'>
              <pre className='f4-xl b ma1'>Description</pre>
            </td>
            <td className='bg-black-40'>
              <pre className='f4-xl b ma1'>Quantity</pre>
            </td>
            <td className='bg-black-40'>
              <pre className='f4-xl b ma1'>Price</pre>
            </td>
            <td className='bg-black-40'>
              <pre className='f4-xl b ma1'>Q.Price</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <pre className='f4-xl b ma1 pt2'>{`પેન્ટ\n\n`}</pre>
              <pre className='f4-xl b ma1'>{`${ShirtData.shirt_type}\n\n`}</pre>
            </td>
            <td>
              <pre className='f4-xl b ma1'>{jobData.pant_quantity !== 0 ? `${jobData.pant_quantity}\n\n` : "-\n\n"}</pre>
              <pre className='f4-xl b ma1'>{jobData.shirt_quantity !== 0 ? `${jobData.shirt_quantity}\n\n` : "-\n\n"}</pre>
            </td>
            <td>
              <pre className='f4-xl b ma1'>{jobData.pant_quantity !== 0 ? `${cprice.pant_price}\n\n` : '-\n\n'}</pre>
              <pre className='f4-xl b ma1'>{jobData.shirt_quantity !== 0 ? `${cprice.shirt_price}\n\n` : '-\n\n'}</pre>
            </td>
            <td>
              <pre className='f4-xl b ma1'>{jobData.pant_quantity !== 0 ? `${Itemprice.pant_price}\n\n` : '-\n\n'}</pre>
              <pre className='f4-xl b ma1'>{jobData.shirt_quantity !== 0 ? `${Itemprice.shirt_price}\n\n` : '-\n\n'}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={4} ></td>
            <td className='bg-black-40'>
              <pre className='f5-xl b ma1'>Item Total</pre>
            </td>
            <td>
              <pre className='f5-xl b ma1'>{Itemprice.shirt_price + Itemprice.pant_price}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={4} ></td>
            <td className='bg-black-40'>
              <pre className='f5-xl b ma1'>Advance</pre>
            </td>
            <td>
              <pre className='f5-xl b ma1'>{advance}</pre>
            </td>
          </tr>
          <tr>
            <td colSpan={4} ></td>
            <td className='bg-black-40'>
              <pre className='f5-xl b ma1'>Total</pre>
            </td>
            <td>
              <pre className='f5-xl b ma1'>{Itemprice.shirt_price + Itemprice.pant_price - advance}</pre>
            </td>
          </tr>
          {/* <tr>
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
          </tr> */}
        </tbody>
      </table>

    </div>
  )
}

export default PrintReceiptTemplate