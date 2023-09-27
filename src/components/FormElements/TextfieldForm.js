import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CssTextField = styled(TextField)({
  '& .Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
      boxShadow: 'inset 0 0 3px black'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
      boxShadow: '2px 2px 3px black'
    },
  },
  '& .MuiInputBase-root': {
    backgroundColor: '#F4F4F4',
    '& fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused': {
      backgroundColor: '#d7bfdc',
    },
  },
});

export const CssChildTextField = styled(TextField)({
  '& .Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
  '& .MuiInputBase-root': {
    backgroundColor: '#F4F4F4',
    '& fieldset': {
      borderColor: 'black',
    },
  },
});

export const MenuItemStyle = {
  "& li": {
    backgroundColor: "white",
  },
  "&:hover": {
    backgroundColor: "#9966cb",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#9966cb",
  }
}