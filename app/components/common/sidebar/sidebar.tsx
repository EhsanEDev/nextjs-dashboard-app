import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import Navigation from "./navigation";

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(11)})`,
});

const Aside = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {/* For mobile and Tablet */}
      <Drawer
        PaperProps={{
          sx: { width: sm ? "100%" : "50%", minWidth: "fit-content" },
        }}
        sx={{ display: { xs: "block", md: "none" } }}
        variant="temporary"
        open={open}
        onClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <Navigation open={open} setOpen={setOpen} />
      </Drawer>
      {/* For Laptop and Desktop */}
      <Aside
        sx={{ display: { xs: "none", md: "block" } }}
        variant="permanent"
        open={open}
      >
        <Navigation open={open} setOpen={setOpen} />
      </Aside>
    </>
  );
}
