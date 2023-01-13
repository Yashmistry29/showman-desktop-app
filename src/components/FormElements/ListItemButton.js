import { styled } from "@mui/material/styles";
import MuiListItem from "@mui/material/ListItemButton";

export const ListItemButton = styled(MuiListItem)({
  backgroundColor: "darkblue",
  "&:hover": {
    backgroundColor: "#2D2DD4",
  },
  "&.Mui-selected": {
    backgroundColor: '#194DFA',
  }
});

