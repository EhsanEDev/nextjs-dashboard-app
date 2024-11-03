"use client";

import { Box, Container } from "@mui/material";
import Header from "@app/components/common/header/header";
import Sidebar from "@app/components/common/sidebar/sidebar";
import { useState } from "react";

export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <Sidebar open={open} setOpen={setOpen} />
        {/* <Breadcrumbs>
        </Breadcrumbs> */}
        <Container sx={{ my: 8 }} maxWidth="xl">
          {children}
        </Container>
      </Box>
    </Box>
  );
}
