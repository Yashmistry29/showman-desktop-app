import React from 'react'
import { Grid } from '@mui/material'
import PantGrid from './PantGrid';
import ShirtGrid from './ShirtGrid';

function CustomerMeasurement({ checkedData, sData, setSData, pData, setPData, shirtQuantity, pantQuantity, setSQuantity, setPQuantity, sErrors, pErrors }) {

  return (
    <div className='flex w-90 center mt4 pb2'>
      <Grid container direction="row" alignItems="center" justify="space-between" spacing={3}>
        <Grid item xs={12} md={6}>
          {/* <fieldset className='br3 b--black'> */}
          <fieldset className={`${checkedData.pant ? 'b--dark-green bw2' : 'b--moon-gray'} br3 ba`}>
            <legend className={`${checkedData.pant ? 'dark-green b' : 'moon-gray'} ph2 pr2`}>Pant Measurement/ પેન્ટ નુ માપ</legend>
            <PantGrid data={pData} setData={setPData} checkedData={checkedData} quantity={pantQuantity} setQuantity={setPQuantity} errors={pErrors} />
          </fieldset>
        </Grid>
        <Grid item xs={12} md={6} >
          <fieldset className={`${checkedData.shirt ? 'b--dark-green bw2' : 'b--moon-gray'} br3 ba`}>
            <legend className={`${checkedData.shirt ? 'dark-green b' : 'moon-gray'} ph2 pr2`} >Shirt Measurement/ શર્ટ નુ માપ</legend>
            <ShirtGrid data={sData} setData={setSData} checkedData={checkedData} quantity={shirtQuantity} setQuantity={setSQuantity} errors={sErrors} />
          </fieldset>
        </Grid>
      </Grid>
    </div>
  )
}

export default CustomerMeasurement