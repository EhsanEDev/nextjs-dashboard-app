import briefInfo from "@app/placeholders/todayBrief.json";
import { Grid2 } from "@mui/material";
import CardBrief from "../components/dashboard/cardBrief/cardBrief";
import CardMostSold from "../components/dashboard/cardMostSold/cardMostSold";
import CardRecentOrders from "../components/dashboard/cardRecentOrders/cardRecentOrders";
import CardTotalRevenue from "../components/dashboard/cardTotalRevenue/cardTotalRevenue";
import { cardType } from "../constants/types";

export default function Home() {
  return (
    <>
      <Grid2 container columns={4} gridColumn={4} spacing={4}>
        {briefInfo.map((card, index) => (
          <Grid2 key={index} size={{ xs: 4, md: 2, lg: 2, xl: 1 }}>
            <CardBrief
              type={card.type as cardType}
              value={card.value}
              percent={card.percent}
            />
          </Grid2>
        ))}

        <Grid2 size={{ xs: 4, lg: 2.5 }}>
          <CardTotalRevenue />
        </Grid2>
        <Grid2 size={{ xs: 4, lg: 1.5 }}>
          <CardMostSold />
        </Grid2>
        <Grid2 size={{ xs: 4 }}>
          <CardRecentOrders />
        </Grid2>
      </Grid2>
    </>
  );
}
