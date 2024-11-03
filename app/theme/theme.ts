"use client";

import { createTheme } from "@mui/material/styles";
import { darkPalette, lightPalette } from "./colorPalette";
import { fontFamily } from "./fontFamily";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  typography: fontFamily,
  shape: {
    borderRadius: 10,
  },
});

export default theme;
