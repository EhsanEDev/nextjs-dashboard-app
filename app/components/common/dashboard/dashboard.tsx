"use client";

import Header from "@app/components/common/header/header";
import Sidebar from "@app/components/common/sidebar/sidebar";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loadingSpinner";
import DynamicBreadcrumbs from "./dynamicBreadcrumbs";
// import Link from "next/link";

export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<boolean | null>(null); // Initialize with null to indicate loading
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Retrieve the last open state of the menu from localStorage
    const savedState = localStorage.getItem("side-menu");
    const initialState = savedState === "false" ? false : true;

    setOpen(sm ? false : initialState);
  }, [sm]);

  useEffect(() => {
    // Store the current open state in localStorage whenever it changes
    if (open !== null) {
      localStorage.setItem("side-menu", String(open));
    }
  }, [open]);

  // Show a loading spinner until the state is initialized
  if (open === null) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header open={open} setOpen={setOpen} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          overflow: "auto",
          flexGrow: 1,
        }}
      >
        <Sidebar open={open} setOpen={setOpen} />
        <Box
          sx={{
            flexGrow: 1,
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          <DynamicBreadcrumbs />
          <Container sx={{ py: 3 }} maxWidth="xl">
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
