import { NotifItem, Notifs } from "@/app/constants/types";
import PaymentIcon from "@mui/icons-material/Payment";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import OrderIcon from '@mui/icons-material/ShoppingCart';
import PromotionIcon from '@mui/icons-material/Percent';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
type Notif = "order" | "payment" | "shipping" | "promotion" | undefined;
export default function ListItems({ items }: { items: Notifs }) {

  // TEMPORARY, NEED TO IMPROVEMENT
  function getIcon(type : Notif ): ReactNode {
    console.log(type);
    
    switch (type) {
      case "order":
        return <OrderIcon />;
      case "payment":
        return <PaymentIcon />;
      case "shipping":
        return <ShippingIcon />;
      case "promotion":
        return <PromotionIcon />;
      default:
        return <PaymentIcon />;
    }
  };
  return (
    <>
      {items.map((item: NotifItem) => (
        <ListItem disablePadding divider>
          <ListItemButton selected={!item.read}>
            <ListItemAvatar>
              <Avatar>
                {(item.sender?.charAt(0).toUpperCase()) ??
                  getIcon(item.type)}
              </Avatar>
            </ListItemAvatar>
            <Stack gap={0.5} flexGrow={1} flexDirection={"column"}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="subtitle2">
                  {item.sender ?? item.type}
                </Typography>
                <Typography color="textSecondary" variant="caption">{item.time}</Typography>
              </Stack>
              <Typography color="textSecondary" variant="body2">{item.message}</Typography>
            </Stack>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}
