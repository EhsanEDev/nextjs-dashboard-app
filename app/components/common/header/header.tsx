import { AppBar, Divider, Stack, Toolbar } from "@mui/material";
import ThemeModeSlot from "./ThemeModeSlot";
import MessageSlot from "./messageSlot";
import NotificationSlot from "./notificationSlot";
import SearchBarSlot from "./searchBarSlot";
import UserProfileSlot from "./userProfileSlot";
import MenuSlot from "./menuSlot";
import Brand from "./brand/brand";

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  return (
    <AppBar
      sx={{
        // px: "10px",
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
          gap={2.4}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"row"}
        >
          <Brand />
          <MenuSlot open={open} setOpen={setOpen} />
          <Divider sx={{ height: 24, display: { xs: "none", md: "block" } }} orientation="vertical" />
          <SearchBarSlot />
        </Stack>
        <Stack gap={1.5} alignItems={"center"} direction={"row"}>
          <ThemeModeSlot variant="drop" />
          <NotificationSlot />
          <MessageSlot />
          {/* <Divider sx={{ height: 24 }} orientation="vertical" /> */}
          <UserProfileSlot />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
