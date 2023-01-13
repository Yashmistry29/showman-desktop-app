import React from 'react'
import { Grid } from '@mui/material'
import PantGrid from './PantGrid';
import ShirtGrid from './ShirtGrid';

function CustomerMeasurement({ checkedData, sData, setSData, pData, setPData, shirtQuantity, pantQuantity, setSQuantity, setPQuantity, sErrors, pErrors }) {

  return (
    <div className='flex w-90 center mt4 pb2'>
      <Grid container direction="row" alignItems="center" justify="space-between" spacing={3}>
        <Grid item xs={12} md={6}>
          <fieldset className='br3 b--black'>
            <legend className={`${checkedData.pant ? 'black b' : 'dark-gray'} ph2 pr2 b`}>Pant Measurement/ પેંત નુ માપ</legend>
            <PantGrid data={pData} setData={setPData} checkedData={checkedData} quantity={pantQuantity} setQuantity={setPQuantity} errors={pErrors} />
          </fieldset>
        </Grid>
        <Grid item xs={12} md={6} >
          <fieldset className='br3 b--black'>
            <legend className={`${checkedData.shirt ? 'black b' : 'dark-gray'} ph2 pr2 b`} >Shirt Measurement/ શર્ત નુ માપ</legend>
            <ShirtGrid data={sData} setData={setSData} checkedData={checkedData} quantity={shirtQuantity} setQuantity={setSQuantity} errors={sErrors} />
          </fieldset>
        </Grid>
      </Grid>
    </div>
  )
}

export default CustomerMeasurement