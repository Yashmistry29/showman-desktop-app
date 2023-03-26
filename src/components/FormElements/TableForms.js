import { TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#702963',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#d7bfdc',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#FFFFF',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));