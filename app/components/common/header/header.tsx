import { AppBar, Divider, Stack, Toolbar } from "@mui/material";
import ThemeModeSlot from "./ThemeModeSlot";
import Brand from "./brand/brand";
import MenuSlot from "./menuSlot";
import MessageSlot from "./messageSlot";
import NotificationSlot from "./notificationSlot";
import SearchBarSlot from "./searchBarSlot";
import UserProfileSlot from "./userProfileSlot";

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  return (
    <AppBar
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      variant="elevation"
      elevation={2}
      color="inherit"
      position="sticky"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
        variant="regular"
      >
        <Stack
          gap={4.5}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
        >
          <MenuSlot open={open} setOpen={setOpen} />
          <Brand />
          {/* <SearchBarSlot /> */}
        </Stack>
        <Stack gap={1.5} alignItems={"center"} direction={"row"}>
          <ThemeModeSlot variant="drop" />
          <NotificationSlot />
          <MessageSlot />
          <Divider sx={{ height: 24 }} orientation="vertical" />
          <UserProfileSlot />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
