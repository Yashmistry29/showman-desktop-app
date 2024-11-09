import React from 'react'
import { Grid } from '@mui/material'
import PantGrid from './PantGrid';
import ShirtGrid from './ShirtGrid';

function CustomerMeasurement({ checkedData, sData, setSData, pData, setPData, setQuantities, quantities, errors }) {

  return (
    <div className='flex w-90 center mt3 pb2'>
      <Grid container direction="row" alignItems="center" justify="space-between" spacing={3}>
        <Grid item xs={12} md={6}>
          {/* <fieldset className='br3 b--black'> */}
          <fieldset className={`${checkedData.pant ? 'b--dark-green b--dashed' : 'b--moon-gray br3'} bw2 ba`}>
            <legend className={`${checkedData.pant ? 'dark-green' : 'moon-gray'} b ph2 pr2`}>Pant Measurement/ પેન્ટ નુ માપ</legend>
            <PantGrid data={pData} setData={setPData} checkedData={checkedData} quantity={quantities.pant} setQuantity={setQuantities} errors={errors.pant} />
          </fieldset>
        </Grid>
        <Grid item xs={12} md={6} >
          <fieldset className={`${checkedData.shirt ? 'b--dark-green b--dashed' : 'b--moon-gray br3'} bw2 ba`}>
            <legend className={`${checkedData.shirt ? 'dark-green' : 'moon-gray'} b ph2 pr2`} >Shirt Measurement/ શર્ટ નુ માપ</legend>
            <ShirtGrid data={sData} setData={setSData} checkedData={checkedData} quantity={quantities.shirt} setQuantity={setQuantities} errors={errors.shirt} />
          </fieldset>
        </Grid>
      </Grid>
    </div>
  )
}

export default CustomerMeasurement