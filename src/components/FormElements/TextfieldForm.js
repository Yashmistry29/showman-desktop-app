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
  }
});

