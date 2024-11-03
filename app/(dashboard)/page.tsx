"use client";

import { Grid2 } from "@mui/material";
import CardBrief from "../components/cardBrief/cardBrief";
export default function Home() {
  return (
    <>
      <Grid2
        container
        columns={4}
        gridColumn={4}
        spacing={4}
      >
        <Grid2 size={{ xs: 4, sm: 4, md: 2, lg: 2, xl: 1 }}>
          <CardBrief type="sales" value="$359,078" percent={3.78} />
        </Grid2>
        <Grid2 size={{ xs: 4, sm: 4, md: 2, lg: 2, xl: 1 }}>
          <CardBrief type="orders" value="168,674" percent={-0.47}  />
        </Grid2>
        <Grid2 size={{ xs: 4, sm: 4, md: 2, lg: 2, xl: 1 }}>
          <CardBrief type="profit" value="$14,225" percent={12.6}  />
        </Grid2>
        <Grid2 size={{ xs: 4, sm: 4, md: 2, lg: 2, xl: 1 }}>
          <CardBrief type="customers" value="26,898" percent={0.14}  />
        </Grid2>
      </Grid2>
    </>
  );
}
