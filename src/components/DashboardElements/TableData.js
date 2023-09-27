import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  Collapse,
  Box,
  Paper,
} from '@mui/material';
import { StyledTableCell as TableCell, StyledTableRow as TableRow } from '../FormElements/TableForms';
import IconButton from '@mui/material/IconButton';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { sendRequest } from '../../utils/Helpers/HelpersMethod'
import { toast, ToastContainer } from 'react-toastify';
const electron = window.require("electron");


const CollapsibleRows = (props) => {
  // const ipcRenderer = electron.ipcRenderer();
  const { CustomerData, data, handleDelete, index } = props;
  const [open, setOpen] = React.useState(false);
  const [activateDelete, setActivateDelete] = React.useState(false);

  var createdAt = new Date(data.createdAt);
  var returnDate = new Date(data.returnDate);

  const HandleClick = () => {
    // console.log(data, CustomerData)
    electron.ipcRenderer.send('jobDetails', ({ job_id: data.job_id, c_id: CustomerData.c_id }));
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell onClick={() => setOpen(!open)}>{data.job_id}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{CustomerData.c_id}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{CustomerData.name}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{CustomerData.phone}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{CustomerData.phone2}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{createdAt.toDateString()}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{returnDate.toDateString()}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{data.shirt_quantity}</TableCell>
        <TableCell onClick={() => setOpen(!open)}>{data.pant_quantity}</TableCell>
        <TableCell>
          {activateDelete ?
            <div className='pv1'>
              <DoneIcon className='cancelButton' onClick={(e) => handleDelete(e, data.job_id, CustomerData.c_id, index)} />
              <CloseIcon className='deleteButton' onClick={(e) => setActivateDelete(false)} />
            </div>
            :
            <IconButton onClick={(e) => setActivateDelete(true)}><RemoveCircleOutlineIcon /></IconButton>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className='flex justify-start'>
                <button
                  className='button-border b--black f7-m link pointer tc ma2 bg-button white ba bw1 dim dib w3 w5-l w4-m pa2 br2'
                  onClick={HandleClick}
                >Print Details</button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function TableData({ data, page, setPage, setData }) {

  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const JobData = data.jobData === undefined ? '' : data.jobData;
  const CustomerData = data.customerData === undefined ? '' : data.customerData;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (e, job_id, c_id, index) => {
    JobData.splice(index, 1);
    setData({
      customerData: CustomerData,
      jobData: JobData
    });
    sendRequest('/job/deletejob', 'POST', { job_id: job_id, c_id: c_id })
      .then((res) => {
        if (res.success) {
          toast.info(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
          });
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            theme: "colored",
          });
        }
      })
  }


  // console.log(data)
  return (
    <Paper >
      <ToastContainer />
      <TableContainer className='br2 font'>
        <Table stickyHeader aria-label="Collapsible table" size='small'>
          <TableHead>
            <TableRow>
              {/* <TableCell padding='checkbox' /> */}
              <TableCell>Job Id</TableCell>
              <TableCell>Customer Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone 1</TableCell>
              <TableCell>Phone 2</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Shirts</TableCell>
              <TableCell>Pants</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              JobData.length === 0 ? null :
                JobData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
                  index = index + (page * rowsPerPage)
                  return (<CollapsibleRows CustomerData={CustomerData.length === 1 ? CustomerData[0] : CustomerData[index]} data={data} key={index} index={index} handleDelete={handleDelete} />)
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
      {
        JobData.length === 0 ? null :
          <TablePagination
            rowsPerPageOptions={[8, 10, 15, { value: JobData.length, label: 'All' }]}
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