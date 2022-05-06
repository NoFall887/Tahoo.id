import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFBC6D",
    },
    secondary: {
      main: blue["A700"],
    },
    customRed: {
      main: "#FF7E81",
    },
  },
});
