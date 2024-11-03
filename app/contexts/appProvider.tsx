"use client";

import theme from "@app/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AccountProvider from "./accountProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <InitColorSchemeScript attribute="class" />
      <CssBaseline />
      <AccountProvider>
        <SessionProvider>{children}</SessionProvider>
      </AccountProvider>
    </ThemeProvider>
  );
}
