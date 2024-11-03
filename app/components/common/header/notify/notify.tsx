import { Notifs } from "@/app/constants/types";
import { DoneAll } from "@mui/icons-material";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  ListItem,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import { Mail01Icon, Notification01Icon,Notification02Icon,Notification03Icon, } from "hugeicons-react";
import { useRef, useState } from "react";
import ListItems from "./listItems";

export default function Notify({
  variant,
  data,
}: {
  variant: "Messages" | "Notifications";
  data: Notifs;
}) {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const anchorEl = useRef<HTMLButtonElement | null>(null);
  const unread: number = data.reduce(
    (count, item) => (!item.read ? count + 1 : count),
    0
  );
  return (
    <>
      <IconButton
        size="large"
        ref={anchorEl}
        onClick={() => setIsShowMenu(true)}
      >
        <Badge variant="dot" badgeContent={8} color="error">
          {variant === "Notifications" ? (
            <Notification02Icon />
          ) : (
            <Mail01Icon color="primary" />
          )}
        </Badge>
      </IconButton>
      <Menu
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorEl={anchorEl.current}
        open={isShowMenu}
        onClose={() => setIsShowMenu(false)}
      >
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack gap={0.5}>
            <Typography variant="h6">{variant}</Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >{`You have ${unread} unread message${
              unread > 1 ? "s" : ""
            }`}</Typography>
          </Stack>
          <IconButton title="Mark all as read">
            <DoneAll />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItems items={data} />
        <ListItem>
          <Button fullWidth variant="text">
            View all
          </Button>
        </ListItem>
      </Menu>
    </>
  );
}
