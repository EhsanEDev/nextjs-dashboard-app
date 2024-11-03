import { TrendingDown, TrendingUp } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import bg from "@app/logo2.png"

type cardType = "sales" | "orders" | "profit" | "customers";
export default function CardBrief({
  type,
  value,
  percent,
}: {
  type: cardType;
  value: string;
  percent: number;
}) {
  return (
    <Card sx={{backgroundImage: `url(${bg})`}}>
      <CardHeader
        titleTypographyProps={{
          color: "textSecondary",
          variant: "body1",
          component: "h6",
        }}
        title={
          (type === "sales"  && "Total sales") ||
          (type === "orders" && "Total orders") ||
          (type === "profit" && "Total profit") ||
          (type === "customers" && "Total customers")
        }
        action={
          <Chip
            color={percent > 0 ? "success" : "warning"}
            size="small"
            variant="outlined"
            label={`${percent}%`}
            icon={
              percent > 0 ? (
                <TrendingUp fontSize="small" />
              ) : (
                <TrendingDown fontSize="small" />
              )
            }
          />
        }
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          // justifyContent: "space-between",
          // alignItems: "end",
          // py: 0
        }}
      >
        <Typography variant="h5" component="h6">
          {value}
        </Typography>
        {/* <Box sx={{ alignSelf: "end" }}>
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6]}
            xAxis={{
              scaleType: "time",
              data: [
                new Date(2022, 5, 1),
                new Date(2022, 5, 2),
                new Date(2022, 5, 5),
                new Date(2022, 5, 6),
                new Date(2022, 5, 7),
                new Date(2022, 5, 8),
                new Date(2022, 5, 11),
                new Date(2022, 5, 12),
              ],
              valueFormatter: (value) => value.toISOString().slice(0, 10),
            }}
            height={75}
            width={150}
            showTooltip
            showHighlight
          />
        </Box> */}
      </CardContent>
    </Card>
  );
}
