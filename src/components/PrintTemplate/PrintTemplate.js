import React from 'react'
import { Table, TableBody, TableCell, TableRow, Box, Grid, Paper } from '@mui/material'

function PrintTemplate({ jobData, customerData, ShirtData, PantData }) {
  const createdAt = new Date(jobData.createdAt);
  const returnDate = new Date(jobData.returnDate);

  return (
    // <TableContainer
    //   component={Paper}
    //   sx={{ height: 605, widht: 795 }}
    //   className="center font ma4 pa1"
    // >
    <div id="printContainer">
      <Paper className='mr4 ml4 pa1' >
        <Table size='small'>
          <TableBody>
            <TableRow sx={{ border: "1px solid black" }}>
              <TableCell colSpan={2} sx={{ border: "1px solid black" }}>
                <Box>
                  <Grid container direction="row" justifyContent="space-around" alignItems="center">
                    <Grid item xs>
                      <div className='font'>
                        <pre className='f2 b ml5 mt0 mb0'>Showman Tailors</pre>
                      </div>
                    </Grid>
                    <Grid item xs>
                      <div>
                        <pre className='f3 mb1 b mt1'>{`Job Date\t: ${createdAt.getDate() + '-' + createdAt.getUTCMonth() + 1 + '-' + createdAt.getFullYear()}`}</pre>
                        <pre className='f3 mb1 b mt1'>{`Customer Id\t: ${customerData.c_id}`}</pre>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: "1px solid black" }}>
              <TableCell sx={{ border: "1px solid black" }}>
                <Box>
                  <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Grid item xs>
                      <div>
                        <pre className='f3 mb4 ml3 b mt0'>{`Pants\t: ${jobData.pant_quantity}`}</pre>
                        <pre className='f3 ma3'><span className="b">{`લંબાઈ\t: `}</span>{PantData === undefined ? "" : PantData.p_length}</pre>
                        <pre className='f3 ma3'><span className="b">{`કમર\t: `}</span>{PantData === undefined ? "" : PantData.waist}</pre>
                        <pre className='f3 ma3'><span className="b">{`ઝોલો\t: `}</span>{PantData === undefined ? "" : PantData.jholo}</pre>
                        <pre className='f3 ma3'><span className="b">{`સીટ\t: `}</span>{PantData === undefined ? "" : PantData.seat}</pre>
                        <pre className='f3 ma3'><span className="b">{`જાંઘ\t: `}</span>{PantData === undefined ? "" : PantData.thighs}</pre>
                        <pre className='f3 ma3'><span className="b">{`ઘુંટણ\t: `}</span>{PantData === undefined ? "" : PantData.knee}</pre>
                        <pre className='f3 ma3'><span className="b">{`મોરી\t: `}</span>{PantData === undefined ? "" : PantData.bottom}</pre>
                      </div>
                    </Grid>
                    <Grid item xs>
                      <div>
                        <pre className='f3 ma3'><span className="b">{`Belt\t: `}</span>{PantData === undefined ? "" : PantData.belt_type}</pre>
                        <pre className='f3 ma3'><span className="b">{`પોકેત\t: `}</span>{PantData === undefined ? "" : PantData.pocket_type}</pre>
                        <pre className='f3 ma3'><span className="b">{`ચીપટી\t: `}</span>{PantData === undefined ? "" : PantData.chipti}</pre>
                        <pre className='f3 ma3'><span className="b">{`બેક પોકેત\t: `}</span>{PantData === undefined ? "" : PantData.back_pocket}</pre>
                        <pre className='f3 ma3'><span className="b">{`\nવિગત \n`}</span>{PantData === undefined ? "" : PantData.description}</pre>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                <Box>
                  <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Grid item xs>
                      <div>
                        <pre className='f3 mb4 ml3 b mt0'>{`${ShirtData.shirt_type}\t: ${jobData.shirt_quantity}`}</pre>
                        <pre className='f3 ma3'><span className="b">{`લંબાઈ\t: `}</span>{ShirtData === undefined ? "" : ShirtData.s_length}</pre>
                        <pre className='f3 ma3'><span className="b">{`સોલ્ડર\t: `}</span>{ShirtData === undefined ? "" : ShirtData.shoulder}</pre>
                        <pre className='f3 ma3'><span className="b">{`બાંય\t: `}</span>{ShirtData === undefined ? "" : ShirtData.sleeve}</pre>
                        <pre className='f3 ma3'><span className="b">{`કફ\t: `}</span>{ShirtData === undefined ? "" : ShirtData.cuff}</pre>
                        <pre className='f3 ma3'><span className="b">{`છાતી\t: `}</span>{ShirtData === undefined ? "" : ShirtData.chest}</pre>
                        <pre className='f3 ma3'><span className="b">{`કમર\t: `}</span>{ShirtData === undefined ? "" : ShirtData.waist}</pre>
                        <pre className='f3 ma3'><span className="b">{`સીટ\t: `}</span>{ShirtData === undefined ? "" : ShirtData.seat}</pre>
                      </div>
                    </Grid>
                    <Grid item xs>
                      <div>
                        <pre className='f3 ma3'><span className="b">{`કોલર\t: `}</span>{ShirtData === undefined ? "" : ShirtData.collar}</pre>
                        <pre className='f3 ma3'><span className="b">{`પોકેત\t: `}</span>{ShirtData === undefined ? "" : ShirtData.pocket}</pre>
                        <pre className='f3 ma3'><span className="b">{`પટ્ટી\t: `}</span>{ShirtData === undefined ? "" : ShirtData.strip === 'in' ? 'અંદર' : 'બાહર'}</pre>
                        <pre className='f3 ma3'><span className="b">{`\nવિગત \n`}</span>{ShirtData === undefined ? "" : ShirtData.description}</pre>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow sx={{ border: "1px solid black" }}>
              <TableCell sx={{ border: "1px solid black" }}>
                <Box>
                  <div >
                    <pre className='f3 b ma1'>{`Name\t: ${customerData.name}`}</pre>
                    <pre className='f3 b ma1'>{`Address\t: ${customerData.address}`}</pre>
                    <pre className='f3 b ma1'>{`Contact\t: ${customerData.phone}, ${customerData.phone2}`}</pre>
                  </div>
                </Box>
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                <Box>
                  <div>
                    <pre className='f3 b mt3'>{`JobNumber     : ${jobData.job_id}`}</pre>
                    <pre className='f3 b ma1'>{`Delivery Date : ${returnDate.getDate() + '-' + returnDate.getUTCMonth() + 1 + '-' + returnDate.getFullYear()}`}</pre>
                  </div>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
    // </TableContainer >
  )
}

export default PrintTemplate