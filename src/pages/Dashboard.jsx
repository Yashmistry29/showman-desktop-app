import React, {
  // useEffect
} from 'react'
import { Grid } from '@mui/material'
import DateSearch from '../components/DashboardElements/DateSearch'
import NameSearch from '../components/DashboardElements/NameSearch'
import TableData from '../components/DashboardElements/TableData'
import '../styles/dashboard.scss'


function Dashboard() {
  const [data, setData] = React.useState({});

  return (
    <div>
      <div className='flex w-90 center mt4 font'>
        <Grid container direction="row" alignItems="center" justify="space-between" spacing={3}>
          <Grid item xs={12} md={6}>
            <NameSearch data={data} setData={setData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateSearch data={data} setData={setData} />
          </Grid>
        </Grid>
      </div>
      <div className='flex w-90 center mt4 table-border br2'>
        <Grid container direction="row" alignItems="center" justify="space-between" spacing={3}>
          <Grid item xs={12}>
            <TableData data={data} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Dashboard