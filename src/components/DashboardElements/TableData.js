import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Box,
  TablePagination,
  Paper,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import { sendRequest } from '../../utils/Helpers/HelpersMethod'
// import { toast, ToastContainer } from 'react-toastify';
const electron = window.require("electron");


const CollapsibleRows = (props) => {
  // const ipcRenderer = electron.ipcRenderer();
  const { CustomerData, data } = props;
  const [open, setOpen] = React.useState(false);

  var createdAt = new Date(data.createdAt);
  var returnDate = new Date(data.returnDate);

  // const handleDelete = (e, job_id, c_id) => {
  //   sendRequest('/job/deletejob', 'POST', { job_id: job_id, c_id: c_id })
  //     .then((res) => {
  //       if (res.success) {
  //         toast.success(res.message, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           theme: "colored",
  //         });
  //       } else {
  //         toast.error(res.message, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           theme: "colored",
  //         });
  //       }
  //     })
  // }

  const HandleClick = () => {
    // console.log(data, CustomerData)
    electron.ipcRenderer.send('jobDetails', ({ jobData: data, CustomerData: CustomerData }));
  }

  return (
    <React.Fragment>
      < TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{data.job_id}</TableCell>
        <TableCell>{CustomerData.c_id}</TableCell>
        <TableCell>{CustomerData.name}</TableCell>
        <TableCell>{CustomerData.phone}</TableCell>
        <TableCell>{CustomerData.phone2}</TableCell>
        <TableCell>{createdAt.toDateString()}</TableCell>
        <TableCell>{returnDate.toDateString()}</TableCell>
        <TableCell>{data.shirt_quantity}</TableCell>
        <TableCell>{data.pant_quantity}</TableCell>
        {/* <TableCell>
          <IconButton className='deleteButton' onClick={(e) => handleDelete(e, data.job_id, CustomerData.c_id)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className='flex justify-start'>
                <p
                  className='button-border f7-m link pointer tc ma2 bg-blue ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
                >Print Receipt</p>
                <p
                  className='button-border f7-m link pointer tc ma2 bg-blue ba bw1 dim dib w3 w5-l w4-m pa2 br2 b'
                  onClick={HandleClick}
                >Show Job Details</p>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function TableData({ data }) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const JobData = data.jobData === undefined ? '' : data.jobData;
  const CustomerData = data.customerData === undefined ? '' : data.customerData;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper>
      {/* <ToastContainer /> */}
      <TableContainer className='bg-white br2 font'>
        <Table stickyHeader aria-label="Collapsible table" size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox' />
              <TableCell>Job Id</TableCell>
              <TableCell>Customer Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone 1</TableCell>
              <TableCell>Phone 2</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Shirts</TableCell>
              <TableCell>Pants</TableCell>
              {/* <TableCell padding='checkbox' >Delete</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              JobData.length === 0 ? null :
                JobData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                  index = index + (page * rowsPerPage)
                  return (<CollapsibleRows CustomerData={CustomerData.length === 1 ? CustomerData[0] : CustomerData[index]} data={data} key={index} />)
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        JobData.length === 0 ? null :
          <TablePagination
            rowsPerPageOptions={[5, 8, 10, { value: -1, label: 'All' }]}
            component="div"
            count={JobData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      }
    </Paper>
  )
}

export default TableData;